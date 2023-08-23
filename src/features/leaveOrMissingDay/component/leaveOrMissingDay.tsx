import React, { FC } from "react";

import { Paper, Text } from "@mantine/core";

import { changedDateFormat } from "shared/util/utility";

interface IProps {
  checkOutDate: string;
}
const LeaveOrMissingDay: FC<IProps> = ({ checkOutDate }) => {
  return (
    <Paper shadow="sm" radius="lg" p={20}>
      {checkOutDate && (
        <Text ta="center" fz="lg" weight={500} mt="md">
          Date:{changedDateFormat(checkOutDate)}
        </Text>
      )}

      <Text ta="center" fz="xl" fw={700} weight={500} mt="md">
        Please apply leave or add missing day
      </Text>
    </Paper>
  );
};

export default LeaveOrMissingDay;
