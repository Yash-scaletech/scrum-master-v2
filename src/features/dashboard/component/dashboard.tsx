import React, { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Tabs } from "@mantine/core";

import httpService from "shared/services/http.service";
import { API_CONFIG } from "shared/constants/api";
import authService from "shared/services/auth.service";

import CheckIn from "features/checkIn/checkIn";
import TimeSheet from "features/timeSheet/component/timeSheet";
import Leave from "features/leave/component/leave";

import UserInfoTab from "./userInfoTab";
import UserDetail from "./userDetail";
import CheckOut from "features/checkOut/component/checkOut";

const Dashboard: FC = () => {
  const { token }: any = useParams();
  const navigate = useNavigate();

  const [actionType, setActionType] = useState("");
  const [activeTab, setActiveTab] = useState<string | null>("check-in");
  const [projectArray, setProjectArray] = useState<any>([]);
  const [newToken, setNewToken] = useState<any>({});
  const [totalWorkingHour, setTotalWorkingHour] = useState("");
  const [leaveDetails, setLeaveDetails] = useState<Record<string, any>>({});

  const checkStatus = useCallback(async () => {
    try {
      await httpService.get(API_CONFIG.path.status).then((res) => {
        setActionType(res.data.action);
        setProjectArray(res.data.projects);

        res.data.tasks?.findUser &&
          console.log("res:", res.data.tasks.findUser[0].usertasks);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log("actionType:", actionType);
  const login = useCallback(
    async (token: string) => {
      try {
        await httpService
          .post(API_CONFIG.path.login, {
            email: "",
            password: "",
            token: token,
          })
          .then((res) => {
            navigate("/");
            authService.setAuthData(res);
            checkStatus();
          });
      } catch (error) {
        console.error(error);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (authService.getAuthData()) {
      const tempToken = authService.getAuthData();
      setNewToken(tempToken);
      navigate("/");
    } else {
      setNewToken(token);
      login(token);
    }
  }, [login, token]);

  useEffect(() => {
    !actionType && authService.getAuthData() && checkStatus();
  }, [actionType, checkStatus]);

  const handleTimeSheetDetails = (workingHours) => {
    setTotalWorkingHour(workingHours);
  };

  const handleLeaveDetails = (leaveInfo) => {
    const {
      grantedLeaves,
      usedLeaves,
      remainingLeaves,
      vacationLeaves,
      compensationLeaves,
    } = leaveInfo;
    setLeaveDetails({
      grantedLeaves,
      usedLeaves,
      remainingLeaves,
      vacationLeaves,
      compensationLeaves,
    });
  };

  const USER_INFO_ARR = [
    {
      label: "Check In",
      value: "check-in",
      content: (
        <>
          {actionType === "checkIn" && (
            <CheckIn projectArray={projectArray} checkStatus={checkStatus} />
          )}
          {actionType === "checkOut" && (
            <CheckOut projectArray={projectArray} />
          )}
        </>
      ),
    },
    {
      label: "Projects",
      value: "projects",
      content: "Project tab content",
    },
    {
      label: "Time Sheet",
      value: "timesheet",
      content: (
        <TimeSheet
          uId={newToken && newToken.userId}
          handleTimeSheetDetails={handleTimeSheetDetails}
        />
      ),
    },
    {
      label: "Leave Report",
      value: "leavereport",
      content: (
        <Leave
          handleLeaveDetails={handleLeaveDetails}
          uId={newToken && newToken.userId}
        />
      ),
    },
  ];

  return (
    <div>
      <Box
        sx={{
          width: "1250px",
          margin: "0 auto",
        }}
      >
        <Tabs
          defaultValue="check-in"
          onTabChange={(data) => {
            setActiveTab(data);
          }}
        >
          <UserDetail
            activeTab={activeTab}
            USER_INFO_ARR={USER_INFO_ARR}
            newToken={newToken}
            totalWorkingHour={totalWorkingHour}
            leaveDetails={leaveDetails}
          />

          <UserInfoTab activeTab={activeTab} USER_INFO_ARR={USER_INFO_ARR} />
        </Tabs>
      </Box>
    </div>
  );
};

export default Dashboard;
