import Date from '@library/date';
import Link from "next/link";
import '@styles/css/card.css';  // Asegúrate de que el archivo CSS esté bien importado

const LatestPostsSection = ({ posts, paddingTop }) => {
    return (
        <>
            <section>
                <div className={paddingTop ? "container mil-p-120-60" : "container mil-p-0-60"}>
                    <div className="row">
                        {posts.slice(0, 2).map((item, key) => (
                            <div className="col-lg-6 col-md-6" key={`news-post-${key}`}>
                                
                                    <div className="mil-cover mil-up mil-long full-width-news-image">
                                        
                                        <img src={item.image} alt={item.title} className="mil-news-image" />
                                    </div>
                                    {/* Texto debajo de la imagen */}
                                    <div className="mil-news-description">
                                    <Date  dateString={item.date} />
                                        <h4 className="mil-upper mil-up mil-mb-10">{item.title}</h4>
                                        <p>{item.short}</p>
                                        <Link href={`/blog/${item.id}`} className="mil-news-card mil-mb-60">
                                        <p className='button-ideas-and-news'>Leer mas</p>
                                        </Link>
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LatestPostsSection;
