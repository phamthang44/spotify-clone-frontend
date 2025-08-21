import Button from "../../../core/components/Button.jsx";
import LinkHrefIcon from "../../../core/assets/icons/LinkHrefIcon.jsx";
import Link from 'react';

export default function DropDown() {
    return (
        <div className="absolute inline-block group text-left bg-[#282828]">
            <ul>
                <li>
                    <Link to="/account">Account</Link>
                    <span><LinkHrefIcon /></span>
                </li>
                <li>
                    <Button>Profile</Button>
                </li>
                <li>
                    <Button>Settings</Button>
                </li>
                <li>
                    <Button>Log out</Button>
                </li>
            </ul>
        </div>
    );
}