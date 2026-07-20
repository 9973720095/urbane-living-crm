"use client";

import { Modal, Typography } from "antd";
import { Employee } from "../types";

const { Text } = Typography;

interface Props {
  open: boolean;
  loading?: boolean;
  employee?: Employee | null;

  onCancel: () => void;
  onConfirm: () => void;
}

export default function EmployeeDeleteDialog({
  open,
  loading = false,
  employee,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal
      open={open}
      centered
      destroyOnClose
      title="Delete Employee"
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{
        danger: true,
        loading,
      }}
      onCancel={onCancel}
      onOk={onConfirm}
    >
      <div className="space-y-4 py-2">

        <Text>
          Are you sure you want to delete this employee?
        </Text>

        {employee && (
          <div className="rounded-xl border bg-slate-50 p-4">

            <div className="font-semibold text-slate-800">
              {employee.name}
            </div>

            <div className="text-sm text-slate-500">
              {employee.email}
            </div>

            <div className="text-sm text-slate-500">
              {employee.whatsapp}
            </div>

            {employee.designation && (
              <div className="mt-2 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                {employee.designation}
              </div>
            )}

          </div>
        )}

        <Text type="danger">
          This action cannot be undone.
        </Text>

      </div>
    </Modal>
  );
}