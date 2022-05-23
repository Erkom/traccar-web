import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import MainPage from './main/MainPage';
import RouteReportPage from './reports/RouteReportPage';
import ServerPage from './settings/ServerPage';
import UsersPage from './settings/UsersPage';
import DevicePage from './settings/DevicePage';
import UserPage from './settings/UserPage';
import NotificationsPage from './settings/NotificationsPage';
import NotificationPage from './settings/NotificationPage';
import GroupsPage from './settings/GroupsPage';
import GroupPage from './settings/GroupPage';
import PositionPage from './other/PositionPage';
import EventReportPage from './reports/EventReportPage';
import ReplayPage from './other/ReplayPage';
import TripReportPage from './reports/TripReportPage';
import StopReportPage from './reports/StopReportPage';
import SummaryReportPage from './reports/SummaryReportPage';
import ChartReportPage from './reports/ChartReportPage';
import DriversPage from './settings/DriversPage';
import DriverPage from './settings/DriverPage';
import CalendarsPage from './settings/CalendarsPage';
import CalendarPage from './settings/CalendarPage';
import ComputedAttributesPage from './settings/ComputedAttributesPage';
import ComputedAttributePage from './settings/ComputedAttributePage';
import MaintenancesPage from './settings/MaintenancesPage';
import MaintenancePage from './settings/MaintenancePage';
import CommandsPage from './settings/CommandsPage';
import CommandPage from './settings/CommandPage';
import StatisticsPage from './reports/StatisticsPage';
import LoginPage from './login/LoginPage';
import RegisterPage from './login/RegisterPage';
import ResetPasswordPage from './login/ResetPasswordPage';
import GeofencesPage from './other/GeofencesPage';
import GeofencePage from './settings/GeofencePage';
import useQuery from './common/util/useQuery';
import { useEffectAsync } from './reactHelper';
import { devicesActions } from './store';
import EventPage from './other/EventPage';
import PreferencesPage from './settings/PreferencesPage';
import AccumulatorsPage from './settings/AccumulatorsPage';
import CommandSendPage from './settings/CommandSendPage';
import App from './App';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [redirectsHandled, setRedirectsHandled] = useState(false);

  const query = useQuery();

  useEffectAsync(async () => {
    if (query.get('token')) {
      const token = query.get('token');
      await fetch(`/api/session?token=${encodeURIComponent(token)}`);
      navigate('/');
    } else if (query.get('deviceId')) {
      const deviceId = query.get('deviceId');
      const response = await fetch(`/api/devices?uniqueId=${deviceId}`);
      if (response.ok) {
        const items = await response.json();
        if (items.length > 0) {
          dispatch(devicesActions.select(items[0].id));
        }
      } else {
        throw Error(await response.text());
      }
      navigate('/');
    } else if (query.get('eventId')) {
      const eventId = parseInt(query.get('eventId'), 10);
      navigate(`/event/${eventId}`);
    } else {
      setRedirectsHandled(true);
    }
  }, [query]);

  if (!redirectsHandled) {
    return (<LinearProgress />);
  }
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />

        <Route path="/position/:id?" element={<PositionPage />} />
        <Route path="/event/:id?" element={<EventPage />} />
        <Route path="/replay" element={<ReplayPage />} />
        <Route path="/geofences" element={<GeofencesPage />} />

        <Route path="/settings/accumulators/:deviceId?" element={<AccumulatorsPage />} />
        <Route path="/settings/calendars" element={<CalendarsPage />} />
        <Route path="/settings/calendar/:id?" element={<CalendarPage />} />
        <Route path="/settings/commands" element={<CommandsPage />} />
        <Route path="/settings/command/:id?" element={<CommandPage />} />
        <Route path="/settings/command-send/:deviceId?" element={<CommandSendPage />} />
        <Route path="/settings/attributes" element={<ComputedAttributesPage />} />
        <Route path="/settings/attribute/:id?" element={<ComputedAttributePage />} />
        <Route path="/settings/device/:id?" element={<DevicePage />} />
        <Route path="/settings/drivers" element={<DriversPage />} />
        <Route path="/settings/driver/:id?" element={<DriverPage />} />
        <Route path="/settings/geofence/:id?" element={<GeofencePage />} />
        <Route path="/settings/groups" element={<GroupsPage />} />
        <Route path="/settings/group/:id?" element={<GroupPage />} />
        <Route path="/settings/maintenances" element={<MaintenancesPage />} />
        <Route path="/settings/maintenance/:id?" element={<MaintenancePage />} />
        <Route path="/settings/notifications" element={<NotificationsPage />} />
        <Route path="/settings/notification/:id?" element={<NotificationPage />} />
        <Route path="/settings/preferences" element={<PreferencesPage />} />
        <Route path="/settings/server" element={<ServerPage />} />
        <Route path="/settings/users" element={<UsersPage />} />
        <Route path="/settings/user/:id?" element={<UserPage />} />

        <Route path="/reports/chart" element={<ChartReportPage />} />
        <Route path="/reports/event" element={<EventReportPage />} />
        <Route path="/reports/route" element={<RouteReportPage />} />
        <Route path="/reports/statistics" element={<StatisticsPage />} />
        <Route path="/reports/stop" element={<StopReportPage />} />
        <Route path="/reports/summary" element={<SummaryReportPage />} />
        <Route path="/reports/trip" element={<TripReportPage />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
