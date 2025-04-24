import React from "react";

export default function LegalSimplicity() {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "960px", margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Legal Simplicity</h1>
        <p style={{ fontSize: "14px", color: "#444" }}>
          All photos and content on TheReal Estate can be downloaded and used for free.
        </p>
      </div>

      <div>
        <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>What is allowed? <span>👌</span></h2>
        <ul style={{ listStyle: "none", padding: "0", marginBottom: "30px" }}>
          <li style={checkStyle}>✔ All content on TheReal Estate is free to use.</li>
          <li style={checkStyle}>✔ Giving credit is appreciated but not required.</li>
          <li style={checkStyle}>✔ You can modify and edit the content as you like.</li>
        </ul>

        <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>What is not allowed? <span>👎</span></h2>
        <ul style={{ listStyle: "none", padding: "0", marginBottom: "30px" }}>
          <li style={crossStyle}>❌ Do not present identifiable people in a bad light or offensive way.</li>
          <li style={crossStyle}>❌ Do not sell unaltered content as standalone product (like a poster).</li>
          <li style={crossStyle}>❌ Do not imply endorsement by people or brands shown in the media.</li>
          <li style={crossStyle}>❌ Do not resell content on other stock/media platforms.</li>
          <li style={crossStyle}>❌ Do not use content as part of trademarks, logos or official marks.</li>
        </ul>
      </div>

      <div style={{ textAlign: "center", margin: "60px 0 30px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Tell your story with imagery</h2>
        <p style={{ fontSize: "14px", color: "#555" }}>
          Some of the use cases for which you can use photos and videos from TheReal Estate.
        </p>
      </div>

      <UseCases />
    </div>
  );
}

const checkStyle = {
  backgroundColor: "#f5f5f5",
  padding: "12px 16px",
  borderRadius: "8px",
  marginBottom: "8px",
  fontSize: "14px",
  color: "#333"
};

const crossStyle = {
  backgroundColor: "#fff0f0",
  padding: "12px 16px",
  borderRadius: "8px",
  marginBottom: "8px",
  fontSize: "14px",
  color: "#333"
};

const UseCases = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
    {useCases.map((item, idx) => (
      <div key={idx} style={{
        flex: "1 1 300px",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#fff"
      }}>
        <img src={item.img} alt={item.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
        <div style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>{item.title}</h3>
          <p style={{ fontSize: "14px", color: "#555" }}>{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const useCases = [
  {
    img: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg",
    title: "On your website, blog or app",
    desc: "Use the photos and videos online – on your e-commerce shop, newsletter, blog, or portfolio."
  },
  {
    img: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    title: "Promote your product",
    desc: "Create marketing campaigns with visuals from TheReal Estate."
  },
  {
    img: "https://images.pexels.com/photos/4386333/pexels-photo-4386333.jpeg",
    title: "Print marketing material",
    desc: "Use for flyers, postcards, books, brochures and more."
  },
  {
    img: "https://images.pexels.com/photos/5052875/pexels-photo-5052875.jpeg",
    title: "Share them on social media",
    desc: "Grow your audience by sharing visuals on platforms like Instagram or YouTube."
  }
];
