import NewsCard from "../components/NewsCard";
import axios from "axios";
import {useState, useEffect} from "react";
import Error from "../components/Error";
import LoadingCard from "../components/LoadingCard";
function HomePage() {

    const [posts, setPosts] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            try {
                setIsLoading(true);
                const response = await axios.get("https://f962fe7b4c5a0f84.mokky.dev/post");
                setPosts(response.data); // json
            } catch(e) {
                setIsError(true);
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (isError) {
        return <Error />;
    }

    return (
        <section className="mobile-block">
            <div className="container">
                {isLoading ? (
                    <LoadingCard />
                ) : (
                    <>
                    <h1 className="title">Соңғы жаңалықтар</h1>
                        <div className="news-list">
                            {posts.map((post) => (
                                <NewsCard key={post.id} post={post} />
                            ))}
                        </div>
                    </>
                )}
                
            
            </div>
        </section>
    );
}

export default HomePage;