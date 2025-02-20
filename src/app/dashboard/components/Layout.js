// pages/channels/whatsapp/template-messages.js
import Layout from '../../../../components/Layout'; // Adjust the path to your Layout component
import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";

const TemplateMessagesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);

  return (
    <Layout>
      <div className="ml-16 lg:ml-64 p-6"> 
        <Typography variant="h4" fontWeight="bold" color="skyblue" gutterBottom>
          Template Messages
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Define your template messages and request for them to be approved, so
          that you can start using them to run outbound campaigns to engage your contacts.
        </Typography>

        <div className="flex justify-between items-center mb-4">
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            className="mr-4"
          />
          <FormControl variant="outlined" size="small" className="mr-4">
            <InputLabel>Select Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              label="Select Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Pending">Requested</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => alert("Add Template clicked")}
          >
            Add Template
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Created By</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Created On</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {templates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No data found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>{template.name}</TableCell>
                    <TableCell>{template.createdBy}</TableCell>
                    <TableCell>{template.category}</TableCell>
                    <TableCell>{template.createdOn}</TableCell>
                    <TableCell>{template.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default TemplateMessagesPage;
