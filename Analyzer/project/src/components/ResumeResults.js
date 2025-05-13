export default function ResumeResults({ results }) {
  return (
    <div>
      <h3>Ranked Resumes</h3>
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r.fileName} - Score: {r.score}</li>
        ))}
      </ul>
    </div>
  );
}