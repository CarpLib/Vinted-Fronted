import { useParams } from "react-router-dom";

export default function Offer() {
  const { id } = useParams();
  console.log(id);
  return <div>Offer</div>;
}
