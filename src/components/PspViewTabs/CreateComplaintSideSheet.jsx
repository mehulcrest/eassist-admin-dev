import { useState } from "react";
import SideSheet from "../SideSheet";

const issueTypes = [
  "All",
  "Service Quality Issue",
  "Caregiver Behavior",
  "Late Arrival",
  "No Show",
  "Safety Concern",
  "Billing Issue",
  "Other",
];

const priorities = ["Low", "Medium", "High"];

const CreateComplaintSideSheet = ({ isOpen, onClose, review }) => {
  const [issueType, setIssueType] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("support");
  const [dueDate, setDueDate] = useState("");

  const selectedReview = review ?? {
    service: "Grocery Trip Assistance",
    rating: 4.5,
    comment:
      "Maria is wonderful! Very patient and caring, Highly recommend, excellent service. Always on time and very Professional.",
  };

  return (
    <SideSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Create Complaint"
      footer={(
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="h-10 flex-1 rounded-lg bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo px-4 text-sm font-semibold text-white"
          >
            Create Complaint
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10 flex-1 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054]"
          >
            Cancel
          </button>
        </div>
      )}
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-textColor">Job Name</p>
          <p className="text-sm text-secondaryTextColor">{selectedReview.service}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-textColor">Rating</p>
          <p className="text-sm text-secondaryTextColor">{selectedReview.rating} ⭐</p>
        </div>

        <div className="space-y-1 border-b border-[#EAECF0] pb-3">
          <p className="text-sm text-textColor">Review</p>
          <p className="whitespace-pre-line text-sm text-secondaryTextColor">{selectedReview.comment}</p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#344054]">
            Issue Type<span className="text-redRejected">*</span>
          </label>
          <select
            value={issueType}
            onChange={(event) => setIssueType(event.target.value)}
            className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054]"
          >
            <option value="" disabled>Select Rejection Reason</option>
            {issueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#344054]">
            Priority<span className="text-redRejected">*</span>
          </label>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054]"
          >
            <option value="" disabled>Select Priority</option>
            {priorities.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#344054]">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Provide details to help the PSP correct the issue..."
            className="w-full rounded-lg border border-[#D0D5DD] bg-white p-3 text-sm text-[#344054] placeholder:text-[#98A2B3]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#344054]">
            Assign To<span className="text-redRejected">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-[#344054]">
              <input
                type="radio"
                name="assignTo"
                checked={assignee === "support"}
                onChange={() => setAssignee("support")}
                className="accent-redRejected"
              />
              Support Agent
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-[#344054]">
              <input
                type="radio"
                name="assignTo"
                checked={assignee === "supervisor"}
                onChange={() => setAssignee("supervisor")}
                className="accent-redRejected"
              />
              Supervisor
            </label>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#344054]">Due Date</label>
          <input
            type="text"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            placeholder="MM-DD-YYYY"
            className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] placeholder:text-[#98A2B3]"
          />
        </div>
      </div>
    </SideSheet>
  );
};

export default CreateComplaintSideSheet;
