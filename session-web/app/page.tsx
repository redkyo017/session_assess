"use client";

import Image from "next/image";
import "./globals.css";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

import { GetSession } from "./services/sessions";
import { SessionItem } from "./components/sessionItem";
import { ProgramShortTitle, ProgramStatus } from "./utils/sessions.enum";

const inputInlineStype = {
  borderRadius: 4,
  borderColor: "#80bdff",
  boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
};

const selectInlineStype = {
  color: "white",
};

const StatusSelect = [
  ProgramStatus.OFFBOARDING,
  ProgramStatus.OFFERING,
  ProgramStatus.RUNNING,
];
const ShortTitleSelect = [
  ProgramShortTitle.VC,
  ProgramShortTitle.DATA,
  ProgramShortTitle.DATA2,
  ProgramShortTitle.DATA3,
  ProgramShortTitle.SCRUM,
  ProgramShortTitle.PRODUCT,
  ProgramShortTitle.PRODUCT2,
  ProgramShortTitle.GROWTH,
];

export default async function Home() {
  const [status, setStatus] = useState("");
  const [short_title, setShortTitle] = useState("");
  const [sessionItems, setSesstionItems] = useState([])

  // const sessions = (await GetSession({})) || [];
  const items = sessionItems.map((item, i) => (
    <SessionItem session={item} key={i} />
  ));

  const handleChangeStatusInput = async (e: any) => {
    setStatus(e.target.value)
    const sessions = await GetSession({status: e.target.value, shortTitle: short_title})
    console.log("change status", sessions.length)
    setSesstionItems(sessions)
  }
  const handleChangeTitleInput = async (e: any) => {
    setShortTitle(e.target.value)
    const sessions = await GetSession({status: status, shortTitle: e.target.value})
    console.log("change title", sessions.length)
    setSesstionItems(sessions)
  }

  useEffect(() => {
    async function fetchData() {
      const sessions = await GetSession({status:"", shortTitle:""})
      setSesstionItems(sessions)
    }
    fetchData()
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} style={inputInlineStype}>
          <InputLabel focused id="status-select-label">
            Status
          </InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={status}
            label="Status"
            style={selectInlineStype}
            onChange={handleChangeStatusInput}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {StatusSelect.map((status, i) => (
              <MenuItem value={status} key={i}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} style={inputInlineStype}>
          <InputLabel focused id="title-select-label">
            Short Title
          </InputLabel>
          <Select
            labelId="title-select-label"
            id="title-select"
            value={short_title}
            onChange={handleChangeTitleInput}
            label="Short Title"
            style={selectInlineStype}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {ShortTitleSelect.map((status, i) => (
              <MenuItem value={status} key={i}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormControl>

      <Grid container alignItems="center" spacing={4}>
        {items}
      </Grid>
    </main>
  );
}
