export default function GenreCard({genre}) {
    return (
        <article className="bg-white p-4 w-100 h-50 rounded-lg">
            {genre.name}
        </article>
    );
}