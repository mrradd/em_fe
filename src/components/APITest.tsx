import { Button } from "@mantine/core";
import axios from "axios";
import { sendChatRequest } from "../api/ChatAPI";

const APITest = () => {

  const sendChat = async () => {
    const data = await sendChatRequest("herp derp","some_guid");
    alert(data.data);
  };

  return (
    <>
      <Button onClick={sendChat}>Chat Test</Button>
    </>
  );
};

export default APITest;