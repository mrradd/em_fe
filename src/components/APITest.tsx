import { Button } from "@mantine/core";
import { ChatAPI } from "../api/ChatAPI";

const APITest = () => {

  const sendChat = async () => {
    const data = await ChatAPI.sendChatRequest("this is a test","some_guid");
    alert(JSON.stringify(data.data));
  };

  const createNewChatThread = async () => {
    const data = await ChatAPI.createNewChatThread("Herp derp");
    alert(JSON.stringify(data.data));
  };

  return (
    <>
      <Button onClick={sendChat}>Chat Test</Button>
      <Button onClick={createNewChatThread}>Create New Chat Thread</Button>
    </>
  );
};

export default APITest;