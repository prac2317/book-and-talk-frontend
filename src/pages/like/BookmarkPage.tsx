import React, {useEffect, useState} from "react";
import BookItem from "../../components/BookItem";
import ky from "ky";


interface BookLike {
    id: number;
    bookTitle: string;
    author: string;
    thumbnail: string;
    publishDate : string;
    publication: string
    isbn13: number;
    groupCount: number;
}

interface BookLikeList {
    data: BookLike[];
}

// const generateBooks = (count: number) =>
//     Array.from({ length: count }, () => ({
//         id: faker.string.uuid(),
//         image: faker.image.urlLoremFlickr({
//             width: 100,
//             height: 150,
//             category: "book",
//         }),
//         title: faker.lorem.words(3),
//         author: faker.person.fullName(),
//         publisher: faker.company.name(),
//         publishDate: faker.date.past().toISOString().split("T")[0],
//     }));

const BookmarkPage: React.FC = () => {
    const [books, setBooks] = useState<BookLikeList>();
    // const removeBook = (id: string) =>
    //     setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response: BookLikeList = await ky.get(`${import.meta.env.VITE_BASE_URL}/api/book/like`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        },
                    }
                ).json();
                setBooks(response);
            } catch (error) {
                console.error('Failed to fetch group details:', error);
            }
        };

        fetchBookData();
    }, []);


    return (
        <div>
            {books?.data.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
};

export default BookmarkPage;
