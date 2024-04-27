import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useMutation } from "react-query";
import myApi from "../../http-common";

export default function BloodGroup(props) {
  const [postResult, setPostResult] = React.useState(null);
  const [form_data, SetFormData] = React.useState(null);

  const { isLoading, mutate } = useMutation(
    async () => {
      return await myApi.post(`/HR/Bg`, form_data);
    },
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
    }
  );
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

  return isLoading ? (
    <>{postResult}</>
  ) : (
    <FormContainer
    
      defaultValues={{ Name: "", Type: "" }}
      onSuccess={(data) => {SetFormData(data); postData()}}
      
    >
      <Paper style={{ padding: "2%" }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item lg={6} xl={6} xs={12} sm={6}>
            <TextFieldElement
              style={{ width: "80%" }}
              required
              margin={"dense"}
              label={"Name"}
              name={"Name"}
            />
          </Grid>
          <Grid item lg={6} xl={6} xs={12} sm={6}>
            <TextFieldElement
              style={{ width: "80%" }}
              required
              margin={"dense"}
              label={"Type"}
              name={"Type"}
            />
          </Grid>
          <Grid item xs={12} sm={12} ls={12} xl={12}>
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="success">
                Submit Form
              </Button>
              <Button
                onClick={clearPostOutput}
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </FormContainer>
  );
}
