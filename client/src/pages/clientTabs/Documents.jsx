import { useOutletContext } from "react-router-dom";
import DocumentViewer from "../DocumentViewer";

const Documents = () => {
  const { client } = useOutletContext();
  
  return <DocumentViewer clientId={client._id} />;
};

export default Documents;
