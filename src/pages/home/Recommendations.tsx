import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ky from 'ky';
import './Recommendations.css';

interface Book {
    title: string;
    author: string;
    thumbnail: string;
    isbn: string; // ISBN 필드 추가
}

interface Category {
    name: string;
    books: Book[];
}

// const API_KEY = import.meta.env.VITE_API_KEY;
// const API_URL = import.meta.env.VITE_API_URL;

const RecommendationList: React.FC = () => {

    const [recommendations, setRecommendations] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await ky.get(`${import.meta.env.VITE_BASE_URL}/api/recommendations`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                }).json<Record<string, { isbn13: string }[]>>();

                const categories = await Promise.all(
                    Object.entries(response).map(async ([category, books]) => {
                        const detailedBooks = await Promise.all(
                            books.map(async (book) => {
                                try {
                                    const kakaoResponse = await ky.get(
                                        `https://dapi.kakao.com/v3/search/book?target=isbn&query=${book.isbn13}`,
                                        {
                                            headers: { Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}` },
                                        }
                                    ).json<{ documents: { title: string; authors: string[]; thumbnail: string }[] }>();

                                    if (kakaoResponse.documents.length > 0) {
                                        const kakaoBook = kakaoResponse.documents[0];
                                        return {
                                            title: kakaoBook.title,
                                            author: kakaoBook.authors.join(', '),
                                            thumbnail: kakaoBook.thumbnail,
                                            isbn: book.isbn13, // ISBN 저장
                                        };
                                    } else {
                                        return { title: 'No title available', author: 'Unknown', thumbnail: '', isbn: book.isbn13 };
                                    }
                                } catch (error) {
                                    console.error(`Failed to fetch details for ISBN ${book.isbn13}`, error);
                                    return { title: 'Error', author: 'Unknown', thumbnail: '', isbn: book.isbn13 };
                                }
                            })
                        );

                        return { name: category, books: detailedBooks };
                    })
                );

                setRecommendations(categories);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();
    }, []);

    const handleBookClick = (isbn: string) => {
        navigate(`/books/${isbn}`); // ISBN을 포함한 경로로 이동
    };

    return (
      <div className="recommendations-container">
        {recommendations.map((category) => (
          <div key={category.name} className="category-section">
            <h2 className="category-title">{category.name}</h2>
            <div className="book-list">
              {category.books.map((book, index) => (
                <div key={index} className="book-card" onClick={() => handleBookClick(book.isbn)}>
                  <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
                  <h3 className="book-title">{book.title}</h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
};

export default RecommendationList;
