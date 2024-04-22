import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  List,
  DialogActions,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import axios from "axios";

function PasswordShareRequestDialog() {
  const [requests, setRequests] = useState([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/password/pending-requests", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Pending requests", res.data);
        setRequests(res.data);
        if (res.data.length > 0) {
          setOpen(true);
        }
      })
      .catch((err) =>
        console.error("Error fetching password share requests:", err)
      );
  }, []);

  function handleAccept(requestId) {
    console.log(requestId);
    axios
      .put(
        `http://localhost:5000/password/share-request/${requestId}`,
        { status: "accepted" },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("accepted request", res.data);
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );
        setOpen(false);
      })
      .catch((err) => {
        console.error("Error accepting password share request:", err);
      });
  }

  function handleReject(requestId) {
    axios
      .put(
        `http://localhost:5000/password/share-request/${requestId}`,
        { status: "rejected" },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("rejected request", res.data);
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );
        setOpen(false);
      })
      .catch((err) => {
        console.error("Error rejecting password share request:", err);
      });
  }

  return (
    <Dialog open={isOpen}>
      <DialogTitle>{"New Password Share prevRequests"}</DialogTitle>
      <DialogContent>
        <List>
          {requests.map((request) => (
            <ListItem key={request._id}>
              <ListItemText
                primary={`Password share request from ${request.senderName}`}
              />
              <Button onClick={() => handleAccept(request.requestId)}>
                Accept
              </Button>
              <Button onClick={() => handleReject(request.requestId)}>
                Reject
              </Button>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default PasswordShareRequestDialog;
