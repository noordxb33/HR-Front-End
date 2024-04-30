import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  FormContainer,
  TextFieldElement,
  AutocompleteElement,
} from "react-hook-form-mui";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useMutation } from "react-query";
import myApi from "../../http-common";

export default function Dessease(props) {
  const [postResult, setPostResult] = React.useState(null);
  const [form_data, SetFormData] = React.useState(null);

    const postreq=async()=>{
      return await myApi.post(`/HR/Bg`, form_data);

    }


  const { isLoading, mutate } = useMutation(postreq(), 
  {
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setPostResult(result);
    },
    onError: (err) => {
      setPostResult(err.response?.data || err);
    },
  });
  useEffect(() => {

    if (isLoading)
     setPostResult("Loading...");
    
  }, [isLoading]);

  function postData() {
    try {
      mutate();
    }
    catch (err){
      setPostResult(err);
    }
  }

  const clearPostOutput = () => {
    setPostResult(null);
  };

  return isLoading ? (postResult):(
    <FormContainer
      defaultValues={{ Name: "", Infection_Type: "" }}
      onSuccess={(data) => {
        SetFormData(data);
        postData();
      }}
    >
      <Paper style={{ padding: "2%" }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item lg={6} xl={6} xs={12} sm={6}>
            <TextFieldElement
              name="Name"
              label="Enter Name of The Desease"
              style={{width:'80%'}}
              required
            />
          </Grid>
          <Grid item lg={6} xl={6} xs={12} sm={6}>
            <AutocompleteElement
              name="Infection_Type"
              required
              options={[
                {
                  id: 1,
                  label: "Infectious",
                },
                {
                  id: 2,
                  label: "Uninfectious",
                },
                {
                  id: 3,
                  label: "Deadly",
                },
                {
                  id: 4,
                  label: "Seviour",
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={12} ls={12} xl={12}></Grid>
          <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="success">
                Submit Form
              </Button>
              <Button
                // onClick={clearPostOutput}
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>
            </Stack>
        </Grid>
      </Paper>
    </FormContainer>
  );
}
