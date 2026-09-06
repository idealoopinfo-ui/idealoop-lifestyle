interface RatingsPopularityProps {
    rating: string;
    setRating: (value: string) => void;
  
    reviewCount: string;
    setReviewCount: (value: string) => void;
  
    soldCount: string;
    setSoldCount: (value: string) => void;
  
    ratingSource: string;
    setRatingSource: (value: string) => void;
  
    statsLastChecked: string;
    setStatsLastChecked: (value: string) => void;
  }
  
  export default function RatingsPopularity({
    rating,
    setRating,
    reviewCount,
    setReviewCount,
    soldCount,
    setSoldCount,
    ratingSource,
    setRatingSource,
    statsLastChecked,
    setStatsLastChecked,
  }: RatingsPopularityProps) {
    return (
      <div className="form-section">
  
        <h3>⭐ Ratings & Popularity</h3>
  
        <div className="input-grid">
  
          {/* RATING */}
  
          <div>
            <label>Rating</label>
  
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) =>
                setRating(e.target.value)
              }
              placeholder="e.g. 4.8"
            />
          </div>
  
          {/* REVIEWS */}
  
          <div>
            <label>Review Count</label>
  
            <input
              type="number"
              min="0"
              step="1"
              value={reviewCount}
              onChange={(e) =>
                setReviewCount(e.target.value)
              }
              placeholder="e.g. 1245"
            />
          </div>
  
          {/* SOLD */}
  
          <div>
            <label>Sold Count</label>
  
            <input
              type="number"
              min="0"
              step="1"
              value={soldCount}
              onChange={(e) =>
                setSoldCount(e.target.value)
              }
              placeholder="e.g. 21000"
            />
  
            <small>
              Enter 21000 for 21K+ sold.
            </small>
          </div>
  
          {/* SOURCE */}
  
          <div>
            <label>Rating Source</label>
  
            <input
              type="text"
              value={ratingSource}
              onChange={(e) =>
                setRatingSource(e.target.value)
              }
              placeholder="e.g. Temu"
            />
          </div>
  
          {/* LAST CHECKED */}
  
          <div>
            <label>Stats Last Checked</label>
  
            <input
              type="date"
              value={statsLastChecked}
              onChange={(e) =>
                setStatsLastChecked(e.target.value)
              }
            />
          </div>
  
        </div>
  
      </div>
    );
  }