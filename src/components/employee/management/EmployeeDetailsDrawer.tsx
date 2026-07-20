"use client";

import {
  Drawer,
  Avatar,
  Tag,
  Divider,
  Descriptions,
  Button,
} from "antd";

import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import { Employee } from "../types";
import { formatDate } from "../utils";

interface Props {
  open: boolean;
  employee?: Employee | null;
  onClose: () => void;
}

export default function EmployeeDetailsDrawer({
  open,
  employee,
  onClose,
}: Props) {
  if (!employee) return null;

  return (
    <Drawer
      open={open}
      width={520}
      title="Employee Details"
      destroyOnClose
      onClose={onClose}
      extra={
        <Button onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="flex flex-col items-center mb-8">

        <Avatar
          size={90}
          style={{
            background: "#4f46e5",
            fontSize: 34,
          }}
        >
          {employee.name?.charAt(0).toUpperCase()}
        </Avatar>

        <h2 className="text-xl font-semibold mt-4">
          {employee.name}
        </h2>

        <p className="text-slate-500">
          {employee.designation || "Employee"}
        </p>

        <div className="mt-4">
          {employee.isActive ? (
            <Tag color="success">
              Active
            </Tag>
          ) : (
            <Tag color="error">
              Inactive
            </Tag>
          )}
        </div>

      </div>

      <Divider />

      <Descriptions
        bordered
        column={1}
        size="middle"
      >
        <Descriptions.Item
          label={
            <>
              <MailOutlined /> Email
            </>
          }
        >
          {employee.email || "-"}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <PhoneOutlined /> WhatsApp
            </>
          }
        >
          {employee.whatsapp || "-"}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <IdcardOutlined /> Designation
            </>
          }
        >
          {employee.designation || "-"}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <CalendarOutlined /> Joined
            </>
          }
        >
          {formatDate(employee.createdAt)}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <UserOutlined /> Employee ID
            </>
          }
        >
          {employee.id}
        </Descriptions.Item>
      </Descriptions>

    </Drawer>
  );
}