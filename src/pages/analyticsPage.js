import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';

const AnalyticsPage = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [aggrigatedData, setAggrigatedData] = useState(null);

  useEffect(() => {
    fetchLogs(page);
    fetchAggrigatedReport();
  }, [page]);

  const fetchLogs = async (page) => {
    try {
      const res = await axios.get(`https://whatsapp-quiz-bot-jqik.onrender.com/v1/api/analytics/survey-logs?page=${page}&limit=10`);
      setLogs(res.data.response.data);
      setTotalPages(res.data.response.totalPages);
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  };

  const fetchAggrigatedReport = async () => {
    try {
      const res = await axios.get('https://whatsapp-quiz-bot-jqik.onrender.com/v1/api/analytics/aggrigated-report');
      setAggrigatedData(res.data.response);
    } catch (err) {
      console.error('Error fetching aggrigated report:', err);
    }
  };

  return (
    <Box display="flex" gap={4} p={2}>
      {/* Logs Table */}
      <Box flex={2}>
        <Typography variant="h6" gutterBottom>
          Survey Logs
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Index</TableCell>
                <TableCell>IP</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, idx) => (
                <TableRow key={log._id}>
                  <TableCell>{idx + 1 + (page - 1) * 20}</TableCell>
                  <TableCell>{log.number}</TableCell>
                  <TableCell>{log.event_name}</TableCell>
                  <TableCell>{log.questionIndex ?? '-'}</TableCell>
                  <TableCell>{log.ip ?? '-'}</TableCell>
                  <TableCell>{new Date(log.event_time).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Typography variant="body2">Page {page} of {totalPages}</Typography>
          <Button
            variant="outlined"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Box>
      </Box>

      {/* Aggregated Report */}
      <Box flex={1} component={Paper} p={2} maxHeight="80vh" overflow="auto">
        <Typography variant="h6" gutterBottom>
          Aggregated Report
        </Typography>
        <Box component="pre" fontSize={14} bgcolor="#f5f5f5" p={2} borderRadius={1}>
          {aggrigatedData ? JSON.stringify(aggrigatedData, null, 2) : 'Loading...'}
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;
