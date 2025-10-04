<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Manager</title>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    th, td {
      padding: 8px;
      border: 1px solid #ccc;
      text-align: center;
    }
    .btn, .btnsm {
      cursor: pointer;
      padding: 5px 10px;
      border: none;
      background: #007bff;
      color: white;
      border-radius: 5px;
    }
    .btnsm {
      background: #dc3545;
    }
    #alert {
      display: none;
      color: green;
      margin-left: 10px;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <h2>Password Manager</h2>
  
  <form>
    <input type="text" id="website" placeholder="Website" required>
    <input type="text" id="username" plac
