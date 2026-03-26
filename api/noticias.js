import { useEffect, useState } from "react";

export default function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadNews() {
    setLoading(true);

    try {
      const res = await fetch("/api/noticias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: "Noticias legales recientes en España con impacto en dinero o derechos"
        })
      });

      const data = await res.json();
      setNews(data.noticias || []);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial", background: "#0C0D11", minHeight: "100vh", color: "white" }}>
      <h1>⚖️ Alex Legal News</h1>

      <button onClick={loadNews} style={{ marginBottom: 20 }}>
        {loading ? "Cargando..." : "Actualizar"}
      </button>

      {news.map((n, i) => (
        <div key={i} style={{ marginBottom: 20, padding: 10, border: "1px solid #333" }}>
          <h3>{n.titulo}</h3>
          <p>{n.resumen}</p>
          <a href={n.url} target="_blank">Ver noticia</a>
        </div>
      ))}
    </div>
  );
}
