import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

// styles
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, loading, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let userPhoto = e.target.files[0];
    console.log(userPhoto);

    if (!userPhoto) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!userPhoto.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (userPhoto.size > 100000) {
      setThumbnailError("Image file size must be less than 100kb");
      return;
    }
    setThumbnailError(null);
    setThumbnail(userPhoto);
    console.log("thumbnail updated");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      <label>
        <span>Display name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>
      <label>
        <span>Profile Thumbnail:</span>
        <input type="file" onChange={handleFileChange} required />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!loading && <button className="btn">Sign up</button>}
      {loading && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
