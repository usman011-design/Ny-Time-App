import { useState, useEffect } from 'react';
import './App.css';

const StoryComponent = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/svc/topstories/v2/home.json');
        if (response.ok) {
          const data = await response.json();
          setStories(data.results || []);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch stories');
        }
      } catch (error) {
        console.error('Error fetching stories', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const Stories = Array.from({ length: 6 }).map((_, index) => ({
    title: `Story ${index + 1}`,
    abstract: 'This is a placeholder story.',
    multimedia: [
      {
        url: `https://via.placeholder.com/150/FF5733/FFFFFF?text=Story+${index + 1}`,
      },
    ],
    url: '#',
  }));

  return (
    <div className="container">
      <h1>NY Times Top Stories</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="story-container">
          {stories.length > 0 ? (
            stories.map((story) => (
              <a key={story.title} href={story.url} target="_blank" rel="noopener noreferrer">
                <div className="story-card">
                  {story.multimedia.length > 0 && (
                    <img src={story.multimedia[0].url} alt={story.title} />
                  )}
                  <h2>{story.title}</h2>
                  <p>{story.abstract}</p>
                </div>
              </a>
            ))
          ) : (
            Stories.map((story, index) => (
              <a key={index} href={story.url} target="_blank" rel="noopener noreferrer">
                <div className="story-card">
                  <img src={story.multimedia[0].url} alt={story.title} />
                  <h2>{story.title}</h2>
                  <p>{story.abstract}</p>
                </div>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StoryComponent;
