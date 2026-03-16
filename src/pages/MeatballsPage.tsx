import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { useEffect, useReducer, useRef, useTransition } from "react";
import { Text, Button, Container, Fieldset, Stack, Textarea, TextInput } from "@mantine/core";
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
  instructions: "",
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
        instructions: action.instructions,
      }
    case "setPreviousMeatball":
      return {
        ...state,
        previousMeatball: action.previousMeatball,
      }
    default:
      console.log(`Reducer action '${action}' is not valid.`);
      return state;
  }
}

/**
 * Allows the user to view and edit details about a single Meatball. Details
 * such as name, description, and instructions.
 */
export const MeatballsPage = observer(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();
  const { meatballStore } = useStores();
  const [isGettingMeatballPending, startGetMeatballTransition] = useTransition();
  const [isSavePending, startSaveTransition] = useTransition();
  const prevMeatballRef = useRef({} as Meatball);

  useEffect(() => {
    doThing();
  }, [params.id]);

  const doThing = () => {
    startGetMeatballTransition(async () => {
      let meatball: Meatball | undefined;

      if (params.id) {
        meatball = await meatballStore.fetchMeatballById(params.id);

        if (meatball) {
          dispatch({ type: "setName", name: meatball.name });
          dispatch({ type: "setDescription", description: meatball.description });
          dispatch({ type: "setInstructions", instructions: meatball.instructions });
          prevMeatballRef.current = meatball;
        }
        else {
          alert("Meatball not found.");
        }
      }
      else {
        alert("No ID given to retrieve Meatball.");
      }
    });
  }

  const handleCancel = () => {
    dispatch({ type: "setName", name: prevMeatballRef.current.name });
    dispatch({ type: "setDescription", description: prevMeatballRef.current.description });
    dispatch({ type: "setInstructions", instructions: prevMeatballRef.current.instructions });
  };

  const handleSave = async () => {
    startSaveTransition(async () => {
      const resp: Meatball | undefined = await meatballStore.updateMeatball(params.id!, state.name, state.description, state.instructions);

      if (!resp) {
        alert("Save unsuccessful.");
      }
      else {
        alert("Save successful.");
        await meatballStore.fetchMeatballs();
        doThing();
      }
    });
  };

  if (isGettingMeatballPending) {
    return (
      <>
        <Text>...Loading {state.name}...</Text>
      </>
    );
  }

  if (isSavePending) {
    return (
      <>
        <Text>...Saving changes...</Text>
      </>
    );
  }

  return (
    <>
      <Container>
        <Fieldset>
          <Stack>
            <TextInput label="Meatball Name" value={state.name} onChange={(e) => {
              dispatch({ type: "setName", name: e.target.value });
            }} />
            <TextInput label="Description" value={state.description} onChange={(e) => {
              dispatch({ type: "setDescription", description: e.target.value });
            }} />
            <Textarea label="Instructions" value={state.instructions} rows={5} onChange={(e) => {
              dispatch({ type: "setInstructions", instructions: e.target.value });
            }} />
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Stack>
        </Fieldset>
      </Container>
    </>
  );
});
