"use client";

import { useEffect } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Button,
  Space,
} from "antd";

import { Employee } from "../types";
import { DESIGNATIONS } from "../constants";

const { Option } = Select;

interface EmployeeFormValues {
  name: string;
  email: string;
  whatsapp: string;
  designation?: string;
}

interface Props {
  open: boolean;
  loading?: boolean;

  employee?: Employee | null;

  onClose: () => void;

  onSubmit: (
    values: EmployeeFormValues
  ) => void;
}

export default function EmployeeDrawer({
  open,
  loading = false,
  employee,
  onClose,
  onSubmit,
}: Props) {
  const [form] = Form.useForm<EmployeeFormValues>();

  useEffect(() => {
    if (!open) return;

    if (employee) {
      form.setFieldsValue({
        name: employee.name,
        email: employee.email,
        whatsapp: employee.whatsapp,
        designation:
          employee.designation || undefined,
      });
    } else {
      form.resetFields();
    }
  }, [employee, form, open]);

  const handleFinish = (
    values: EmployeeFormValues
  ) => {
    onSubmit(values);
  };

  const drawerWidth =
    typeof window !== "undefined" &&
    window.innerWidth < 768
      ? "100%"
      : 480;

  return (
    <Drawer
      open={open}
      width={drawerWidth}
      destroyOnClose
      maskClosable={false}
      title={
        employee
          ? "Edit Employee"
          : "Add Employee"
      }
      onClose={onClose}
      extra={
        <Button onClick={onClose}>
          Close
        </Button>
      }
    >
      <Form<EmployeeFormValues>
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
      >
        {/* Employee Name */}

        <Form.Item
          label="Employee Name"
          name="name"
          rules={[
            {
              required: true,
              message:
                "Employee name is required",
            },
          ]}
        >
          <Input
            size="large"
            autoComplete="name"
            placeholder="Enter employee name"
          />
        </Form.Item>

        {/* Email */}

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: "Email is required",
            },
            {
              type: "email",
              message:
                "Enter valid email address",
            },
          ]}
        >
          <Input
            size="large"
            autoComplete="email"
            placeholder="Enter email"
          />
        </Form.Item>

        {/* WhatsApp */}

        <Form.Item
          label="WhatsApp Number"
          name="whatsapp"
          rules={[
            {
              required: true,
              message:
                "WhatsApp number is required",
            },
          ]}
        >
          <Input
            size="large"
            maxLength={10}
            autoComplete="tel"
            placeholder="9876543210"
          />
        </Form.Item>

        {/* Designation */}

        <Form.Item
          label="Designation"
          name="designation"
        >
          <Select
            size="large"
            allowClear
            placeholder="Select Designation"
          >
            {DESIGNATIONS.map(
              (designation) => (
                <Option
                  key={designation}
                  value={designation}
                >
                  {designation}
                </Option>
              )
            )}
          </Select>
        </Form.Item>

        {/* Footer */}

        <Form.Item className="mb-0 mt-8">
          <Space
            style={{
              width: "100%",
              justifyContent:
                "flex-end",
            }}
          >
            <Button
              size="large"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
            >
              {employee
                ? "Update Employee"
                : "Create Employee"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
}