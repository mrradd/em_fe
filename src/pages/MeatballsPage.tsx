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
        instructions: action.instructions,
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
  const ogMeatball = useRef({} as Partial<Meatball>);

  useEffect(() => {
    startGetMeatballTransition(async () => {
      let meatball: Meatball | undefined;

      if (params.id) {
        meatball = await meatballStore.fetchMeatballById(params.id);

        if (meatball) {
          dispatch({ type: "setName", name: meatball.name });
          dispatch({ type: "setDescription", description: meatball.description });
          dispatch({ type: "setInstructions", instructions: meatball.instructions });

          ogMeatball.current = meatball;
        }
        else {
          alert("Meatball not found.");
        }
      }
      else {
        alert("No ID given to retrieve Meatball.");
      }
    });
  }, [meatballStore, params.id]);

  const handleCancel = () => {
    dispatch({ type: "setName", name: ogMeatball.current.name });
    dispatch({ type: "setDescription", description: ogMeatball.current.description });
    dispatch({ type: "setInstructions", instructions: ogMeatball.current.instructions });
  };

  const handleSave = async () => {
    await startSaveTransition(async () => {
      const resp = await meatballStore.updateMeatball(params.id!, state.name, state.description, state.instructions);

      if (!resp) {
        alert("Save unsuccessful.");
      }
      else {
        //HACK Refresh the meatball list.
        await meatballStore.fetchMeatballs();
        alert("Save successful.");
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
