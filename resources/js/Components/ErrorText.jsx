export default function ErrorText({children}) {
  if (Array.isArray(children) && children.length > 1) {
    return (
      <ul className="text-sm text-red-500 mt-1 list-disc ms-3">
        {children.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p className="text-sm text-red-500 mt-1">{children}</p>;
}
