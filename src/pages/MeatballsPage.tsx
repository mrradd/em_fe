import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { useEffect, useReducer, useTransition } from "react";
import { MeatballList } from "../components/MeatballList";
import { Box, Button, Container, Fieldset, Flex, Group, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { NewMeatballButton } from "../components/NewMeatballButton";
import { useParams } from "react-router-dom";
import type { Meatball } from "../models/Meatball";

type MeatballsPageState = {
  name: string,
  description: string,
  instructions: string,
}

const initialState: MeatballsPageState = {
  name: "",
  description: "",
  instructions: ""
}

function reducer(state: MeatballsPageState, action: any) {
  switch (action.type) {
    case "setName":
      return {
        ...state,
        name: action.name
      }
    case "setDescription":
      return {
        ...state,
        description: action.description,
      }
    case "setInstructions":
      return {
        ...state,
        description: action.instructions,
      }
    default:
      console.log(`Reducer action '${action}' is not valid.`);
      return state;
  }
}

export const MeatballsPage = observer(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();
  const { meatballStore } = useStores();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      let meatball: Meatball | undefined;

      if (params.id) {
        meatball = await meatballStore.fetchMeatballById(params.id);

        if (meatball) {
          dispatch({ type: "setName", name: meatball.name });
          dispatch({ type: "setDescription", name: meatball.name });
          dispatch({ type: "setInstructions", name: meatball.name });
        }
        else {
          alert("Meatball not found.");
        }
      }
      else {
        alert("No ID given to retrieve Meatball.");
      }
    });
  }, [params.id]);

  return (
    <>
      <Container>
        <Fieldset>
          <Stack>
            <TextInput label="Meatball Name" value={state.name} />
            <TextInput label="Description" value={state.description} />
            <Textarea label="Instructions" value={state.instructions} rows={5} onChange={(e) => {

            }} />
            <Button>Save</Button>
          </Stack>
        </Fieldset>

      </Container>

    </>
  );
});
