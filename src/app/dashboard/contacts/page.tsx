"use client";

import { axiosInstance } from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ChevronDown, Filter } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type ContactList = {
  _id: string;
  name: string;
};
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_APP_API_URL || "https://dev.white-lab.io";
const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalContacts, setTotalContacts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(""); // "add" or "remove"
  const [isCreateContactModalOpen, setIsCreateContactModalOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  //const [selectedListId, setSelectedListId] = useState(""); // ID of selected contact list
  // Date filtering state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Modal state for variable filtering
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterField, setFilterField] = useState<string | null>(null);
  const [filterOperator, setFilterOperator] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | null>(null);

  // Dropdown state for contact lists
  const [contactLists, setContactLists] = useState<ContactList[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editListId, setEditListId] = useState<string | null>(null);
  const [editListName, setEditListName] = useState<string>("");
  const [newListName, setNewListName] = useState("");

  // Selected contact list state
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [allFields, setAllFields] = useState<string[]>([]); // All fields from backend
  const [visibleFields, setVisibleFields] = useState<string[]>([
    "name",
    "email",
    "phone",
    "countryCode",
    "createdAt",
  ]); // Default visible fields
  const [isColumnsDropdownOpen, setIsColumnsDropdownOpen] = useState(false); // Tracks dropdown visibility

  useEffect(() => {
    fetchContacts();
  }, [currentPage, rowsPerPage, selectedListId]);

  const fetchContacts = async (filter: any = {}, dates: any = {}) => {
    setIsLoading(true);
    try {
      const { filterField, filterOperator, filterValue } = filter;
      const { startDate, endDate } = dates;

      let url = `/api/clients?page=${currentPage}&limit=${rowsPerPage}`;
      if (filterField && filterOperator && filterValue) {
        url += `&filterField=${filterField}&filterOperator=${filterOperator}&filterValue=${filterValue}`;
      } else if (startDate && endDate) {
        url = `/api/clients/filter/by-date?startDate=${startDate}&endDate=${endDate}&page=${currentPage}&limit=${rowsPerPage}`;
      } else if (selectedListId) {
        url = `/contact-lists/${selectedListId}`; // Fetch specific contact list
      }

      const response = await axiosInstance.get(url);
      setContacts(response.data.clients);
      setTotalContacts(response.data.totalClients || response.data.clients.length);

      // Extract all fields dynamically
      if (response.data.clients.length > 0) {
        const keys = Object.keys(response.data.clients[0]);
        setAllFields(keys);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch contacts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchContactLists = async () => {
      try {
        const response = await axiosInstance.get("/contact-lists/");
        setContactLists(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch contact lists");
      }
    };
    fetchContactLists();
  }, [])


  const handleCreateList = async () => {
    if (!newListName) {
      setError("List name is required");
      return;
    }

    try {
      const response = await axiosInstance.post("/contact-lists/", { name: newListName });
      setContactLists((prev: ContactList[]) => [...prev, response.data]);
      setNewListName("");
      setIsCreateListModalOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to create contact list");
    }
  };

  const handleApplyDateFilter = () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }

    const formattedStartDate = format(startDate, "yyyy/MM/dd");
    const formattedEndDate = format(endDate, "yyyy/MM/dd");

    fetchContacts({}, { startDate: formattedStartDate, endDate: formattedEndDate });
  };
  const handleDeleteContactList = async (id: string) => {
    try {
      await axiosInstance.delete(`/contact-lists/${id}`);
      setContactLists((prev) => prev.filter((list) => list._id !== id)); // Remove from state
    } catch (err: any) {
      setError(err.message || "Failed to delete contact list");
    }
  };

  const handleCreateContact = async () => {
    if (!contactName || !contactEmail || !contactPhone) {
      setFormError("All fields are required.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/clients", {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
      });

      // On success, close modal and refresh contacts
      alert("Contact created successfully!");
      setIsCreateContactModalOpen(false);
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setFormError(null);

      fetchContacts(); // Refresh the contacts list
    } catch (err: any) {
      console.error("Error creating contact:", err.response || err.message);
      setFormError(err.response?.data?.error || "Failed to create contact.");
    }
  };


  const handleEditContactList = async () => {
    if (!editListId || !editListName) {
      setError("List name cannot be empty.");
      return;
    }

    try {
      const response = await axiosInstance.put(`/contact-lists/${editListId}`, {
        name: editListName,
      });
      // Update the contact list name in the state
      setContactLists((prev) =>
        prev.map((list) =>
          list._id === editListId ? { ...list, name: response.data.name } : list
        )
      );
      setIsEditModalOpen(false);
      setEditListName("");
      setEditListId(null);
    } catch (err: any) {
      setError(err.message || "Failed to edit contact list name");
    }
  };

  const handleApplyVariableFilter = () => {
    if (!filterField || !filterOperator || !filterValue) {
      setError("All filter fields are required");
      return;
    }

    fetchContacts({ filterField, filterOperator, filterValue });
    setIsFilterModalOpen(false);
  };

  const handleFetchConversation = async (clientId: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/conversations/client/${clientId}`
      );
      console.log("Fetched Conversation Data:", response.data);
      // Pass this data to another page or store it in state
    } catch (err: any) {
      console.error("Error fetching conversation:", err.message);
    }
  };

  const handleResetFilter = () => {
    setFilterField(null);
    setFilterOperator(null);
    setFilterValue(null);
    setStartDate(null);
    setEndDate(null);
    setSelectedListId(null);
    fetchContacts();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleManageContacts = async () => {
    if (!selectedAction || !selectedListId) {
      setError("Please select an action and a contact list.");
      return;
    }

    const endpoint =
      selectedAction === "add"
        ? `/contact-lists/${selectedListId}/clients`
        : `/contact-lists/${selectedListId}/clients/remove`;

    const method = selectedAction === "add" ? "post" : "put";

    console.log("Endpoint:", endpoint);
    console.log("Method:", method);
    console.log("Client IDs:", selectedContacts);

    try {
      await axiosInstance[method](endpoint, {
        clientIds: selectedContacts,
      });

      alert(
        selectedAction === "add"
          ? "Contacts successfully added to the list!"
          : "Contacts successfully removed from the list!"
      );

      // Reset modal and selection state
      setIsActionModalOpen(false);
      setSelectedAction("");
      setSelectedListId("");
      setSelectedContacts([]);
    } catch (err: any) {
      console.error("Error:", err.response || err.message);
      setError(err.response?.data?.error || "Failed to manage contacts.");
    }
  };


  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  const totalPages = Math.ceil(totalContacts / rowsPerPage);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            {/* Display Total Contacts */}
            <span className="text-sm font-medium text-gray-700">
              {totalContacts} Contacts
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                {selectedContacts.length > 0 && (
                  <button
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    onClick={() => setIsActionModalOpen(true)}
                  >
                    ⚙️ Manage Contacts
                  </button>
                )}
              </span>
            </div>
          </div>
          <div className="relative">
            {/* Columns Button */}
            <button
              className="rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400"
              onClick={() => setIsColumnsDropdownOpen(!isColumnsDropdownOpen)}
            >
              Columns
            </button>


            {/* Dropdown List */}
            {isColumnsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 h-64 overflow-auto rounded-md bg-white shadow-lg z-10">
                <div className="p-2">
                  {allFields.map((field) => (
                    <label
                      key={field}
                      className="flex items-center gap-2 p-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={visibleFields.includes(field)}
                        disabled={
                          visibleFields.length === 5 && !visibleFields.includes(field)
                        } // Disable when already 5 are selected
                        onChange={(e) => {
                          if (e.target.checked) {
                            setVisibleFields((prev) => [...prev, field]); // Add field
                          } else {
                            setVisibleFields((prev) =>
                              prev.filter((visibleField) => visibleField !== field)
                            ); // Remove field
                          }
                        }}
                      />
                      {field}
                    </label>
                  ))}

                </div>
              </div>
            )}
          </div>

          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            onClick={() => setIsFilterModalOpen(true)}
          >
            Filter by Variable
          </button>
          <div className="relative">
            <button
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              onClick={() => setIsCreateContactModalOpen(true)}
            >
              + Create Contact
            </button>
          </div>
          {/* Dropdown for Contact Lists */}
          <div className="relative z-10">
            <button
              className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);

              }}
            >
              All Contacts <ChevronDown className="h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-md bg-white shadow-lg">
                <ul className="py-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <li
                    className="px-4 py-2 text-sm font-bold text-blue-600 hover:bg-gray-100 cursor-pointer"
                    onClick={handleResetFilter}
                  >
                    All Contacts
                  </li>
                  {contactLists.map((list: any) => (
                    <li
                      key={list._id}
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <span onClick={() => {
                        setSelectedListId(list._id)
                        setIsDropdownOpen(!isDropdownOpen);
                      }
                      } >{list.name}</span>
                      <div className="flex gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => {
                            setEditListId(list._id);
                            setEditListName(list.name);
                            setIsEditModalOpen(true);
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteContactList(list._id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </li>
                  ))}
                  <li
                    className="px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsCreateListModalOpen(true)}
                  >
                    + Create New List
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b bg-white px-6 py-3">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy/MM/dd"
          placeholderText="Start Date"
          className="border rounded-md px-2 py-1 text-sm"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy/MM/dd"
          placeholderText="End Date"
          className="border rounded-md px-2 py-1 text-sm"
        />
        <button
          className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          onClick={handleApplyDateFilter}
        >
          <Filter className="h-4 w-4" /> Filter by Date
        </button>
      </div>

      {/* Contacts Table */}
      <div className="flex-1 overflow-auto">
        <table className="min-w-full table-fixed border-collapse">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              {/* Checkbox Column */}
              <th className="w-[50px] px-6 py-3 text-left text-sm font-medium text-gray-500">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedContacts(contacts.map((contact: any) => contact._id));
                    } else {
                      setSelectedContacts([]);
                    }
                  }}
                  checked={selectedContacts.length === contacts.length && contacts.length > 0}
                />
              </th>
              {/* Dynamic Columns */}
              {visibleFields.map((field) => (
                <th
                  key={field}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                >
                  {field}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact: any) => (
              <tr key={contact._id} className="hover:bg-gray-50">
                {/* Checkbox Column */}
                <td className="px-6 py-3 text-sm flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedContacts((prev) => [...prev, contact._id]);
                      } else {
                        setSelectedContacts((prev) =>
                          prev.filter((id) => id !== contact._id)
                        );
                      }
                    }}
                  />

                  {/* Link Icon */}
                  <a
                    href={`/dashboard/live-chat?clientId=${contact._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {/* Use an icon library or emoji for the link */}
                    <button
                      onClick={() => handleFetchConversation(contact._id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Go to Livechat"
                    >
                      🔗
                    </button>
                  </a>
                </td>

                {/* Dynamic Columns */}
                {visibleFields.map((field) => (
                  <td key={field} className="truncate px-6 py-3 text-sm text-gray-900">
                    {contact[field] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>


        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Rows per page:</span>
          <select
            className="rounded-md border px-2 py-1 text-sm"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {"<"}
          </button>
          <button
            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {">"}
          </button>
        </div>
      </div>

      {/* Modals */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Filter by Variable</h2>
            <div>
              <label className="block mb-2">Field:</label>
              <input
                type="text"
                value={filterField || ""}
                onChange={(e) => setFilterField(e.target.value)}
                className="w-full px-3 py-2 border rounded-md mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Operator:</label>
              <select
                value={filterOperator || ""}
                onChange={(e) => setFilterOperator(e.target.value)}
                className="w-full px-3 py-2 border rounded-md mb-4"
              >
                <option value="">Select an operator</option>
                <option value="equals to">Equals to</option>
                <option value="not equal">Not equal</option>
                <option value="contains">Contains</option>
                <option value="is empty">Is Empty</option>
                <option value="is not empty">Is Not Empty</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Value:</label>
              <input
                type="text"
                value={filterValue || ""}
                onChange={(e) => setFilterValue(e.target.value)}
                className="w-full px-3 py-2 border rounded-md mb-4"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-400 px-4 py-2 text-white rounded-lg mr-2"
                onClick={() => setIsFilterModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 px-4 py-2 text-white rounded-lg"
                onClick={handleApplyVariableFilter}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreateListModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Create New List</h2>
            <input
              type="text"
              placeholder="List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-400 px-4 py-2 text-white rounded-lg mr-2"
                onClick={() => setIsCreateListModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 px-4 py-2 text-white rounded-lg"
                onClick={handleCreateList}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Edit Contact List Name</h2>
            <input
              type="text"
              value={editListName}
              onChange={(e) => setEditListName(e.target.value)}
              placeholder="Enter new list name"
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-400 px-4 py-2 text-white rounded-lg mr-2"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditListName("");
                  setEditListId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 px-4 py-2 text-white rounded-lg"
                onClick={handleEditContactList}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isActionModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Manage Contacts</h2>

            {/* Action Dropdown */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Action</label>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Action</option>
                <option value="add">Add to List</option>
                <option value="remove">Remove from List</option>
              </select>
            </div>

            {/* Contact List Dropdown */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Select Contact List</label>
              <select
                value={selectedListId as string}
                onChange={(e) => setSelectedListId(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select List</option>
                {contactLists.map((list) => (
                  <option key={list._id} value={list._id}>
                    {list.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                onClick={() => setIsActionModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={() => handleManageContacts()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {isCreateContactModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Create Contact</h2>

            {/* Form Fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter contact name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter contact email address"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                placeholder="Enter contact phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 px-4 py-2 text-white rounded-lg"
                onClick={() => {
                  setIsCreateContactModalOpen(false);
                  setFormError(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 px-4 py-2 text-white rounded-lg"
                onClick={handleCreateContact}
              >
                Create Contact
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ContactsPage;
