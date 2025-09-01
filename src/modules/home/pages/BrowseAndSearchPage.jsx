import GenreCard from "../components/GenreCard.jsx";

export default function BrowseAndSearchPage({genres}) {
    return (
        <section className="grid grid-cols-5 gap-4">
            {genres
                ? genres.map((genre, index) => (
                    <GenreCard key={index} genre={genre} />
                ))
                : null}
        </section>
    );
}