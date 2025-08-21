import React, { useState, useRef, useEffect } from 'react';

const CustomScrollbar = ({
                             children,
                             className = "",
                             height = "400px",
                             thumbColor = "bg-gray-600",
                             trackColor = "bg-gray-800",
                             thumbHoverColor = "bg-gray-500",
                             width = "8px",
                             borderRadius = "rounded-full"
                         }) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);

    const contentRef = useRef(null);
    const thumbRef = useRef(null);
    const trackRef = useRef(null);

    // Update scroll measurements
    const updateScrollData = () => {
        if (contentRef.current) {
            setScrollTop(contentRef.current.scrollTop);
            setScrollHeight(contentRef.current.scrollHeight);
            setClientHeight(contentRef.current.clientHeight);
        }
    };

    // Handle content scroll
    const handleScroll = () => {
        updateScrollData();
        setIsScrolling(true);

        // Hide scrollbar after scrolling stops
        const timer = setTimeout(() => {
            if (!isDragging) {
                setIsScrolling(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    };

    // Handle thumb drag
    const handleThumbMouseDown = (e) => {
        setIsDragging(true);
        setIsScrolling(true);
        setDragStart(e.clientY);
        setScrollStart(scrollTop);
        e.preventDefault();
    };

    // Handle mouse move during drag
    const handleMouseMove = (e) => {
        if (!isDragging || !contentRef.current || !trackRef.current) return;

        const deltaY = e.clientY - dragStart;
        const trackHeight = trackRef.current.offsetHeight;
        const scrollRatio = scrollHeight / trackHeight;
        const newScrollTop = scrollStart + (deltaY * scrollRatio);

        contentRef.current.scrollTop = Math.max(0, Math.min(newScrollTop, scrollHeight - clientHeight));
    };

    // Handle mouse up
    const handleMouseUp = () => {
        setIsDragging(false);
        setTimeout(() => {
            if (!isScrolling) {
                setIsScrolling(false);
            }
        }, 1000);
    };

    // Handle track click
    const handleTrackClick = (e) => {
        if (!contentRef.current || !trackRef.current || e.target === thumbRef.current) return;

        const trackRect = trackRef.current.getBoundingClientRect();
        const clickY = e.clientY - trackRect.top;
        const trackHeight = trackRect.height;
        const scrollRatio = scrollHeight / trackHeight;
        const newScrollTop = clickY * scrollRatio;

        contentRef.current.scrollTop = Math.max(0, Math.min(newScrollTop, scrollHeight - clientHeight));
    };

    // Mouse event listeners
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = 'none';
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
        };
    }, [isDragging, dragStart, scrollStart]);

    // Initialize scroll data
    useEffect(() => {
        updateScrollData();
        const resizeObserver = new ResizeObserver(() => {
            updateScrollData();
        });

        if (contentRef.current) {
            resizeObserver.observe(contentRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [children]);

    // Calculate thumb properties
    const scrollRatio = scrollHeight > clientHeight ? clientHeight / scrollHeight : 1;
    const thumbHeight = Math.max(scrollRatio * clientHeight, 30); // Minimum thumb height
    const thumbTop = scrollHeight > clientHeight ? (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight) : 0;
    const showScrollbar = scrollHeight > clientHeight;

    return (
        <div className={`relative ${className}`} style={{ height }}>
            {/* Content area */}
            <div
                ref={contentRef}
                className="h-full overflow-hidden hover:pr-2 transition-all duration-200"
                style={{ paddingRight: showScrollbar && (isScrolling || isDragging) ? width : '0px' }}
                onScroll={handleScroll}
                onMouseEnter={() => updateScrollData()}
            >
                <div className="pr-4">
                    {children}
                </div>
            </div>

            {/* Custom scrollbar */}
            {showScrollbar && (
                <div
                    ref={trackRef}
                    className={`absolute right-0 top-0 ${width === '8px' ? 'w-2' : 'w-3'} h-full ${trackColor} ${borderRadius} cursor-pointer transition-opacity duration-300 ${
                        isScrolling || isDragging ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={handleTrackClick}
                    onMouseEnter={() => setIsScrolling(true)}
                    onMouseLeave={() => {
                        if (!isDragging) {
                            setTimeout(() => setIsScrolling(false), 500);
                        }
                    }}
                >
                    {/* Scrollbar thumb */}
                    <div
                        ref={thumbRef}
                        className={`absolute left-0 right-0 ${thumbColor} hover:${thumbHoverColor} ${borderRadius} cursor-grab transition-colors duration-200 ${
                            isDragging ? 'cursor-grabbing' : ''
                        }`}
                        style={{
                            height: `${thumbHeight}px`,
                            transform: `translateY(${thumbTop}px)`,
                        }}
                        onMouseDown={handleThumbMouseDown}
                    />
                </div>
            )}
        </div>
    );
};
