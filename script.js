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
    <input type="text" id="username" placeholder="Username" required>
    <input type="password" id="password" placeholder="Password" required>
    <button class="btn">Save Password</button>
    <span id="alert">Copied!</span>
  </form>

  <table></table>

  <script>
    // Mask password
    function maskPassword(pass) {
      return "*".repeat(pass.length);
    }

    // Copy text to clipboard
    function copyText(txt) {
      navigator.clipboard.writeText(txt).then(
        () => {
          document.getElementById("alert").style.display = "inline";
          setTimeout(() => {
            document.getElementById("alert").style.display = "none";
          }, 2000);
        },
        () => {
          alert("Clipboard copying failed");
        }
      );
    }

    // Delete password by index
    const deletePassword = (index) => {
      let data = localStorage.getItem("passwords");
      let arr = JSON.parse(data);
      arr.splice(index, 1);
      localStorage.setItem("passwords", JSON.stringify(arr));
      alert(`Successfully deleted password #${index + 1}`);
      showPasswords();
    };

    // Show saved passwords in table
    const showPasswords = () => {
      let tb = document.querySelector("table");
      let data = localStorage.getItem("passwords");

      if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "<tr><td colspan='4' style='text-align:center'>No Data To Show</td></tr>";
      } else {
        tb.innerHTML = `
          <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
          </tr>
        `;
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];

          str += `<tr>
            <td>${element.website} 
              <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy" width="12" height="12">
            </td>
            <td>${element.username} 
              <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy" width="12" height="12">
            </td>
            <td>${maskPassword(element.password)} 
              <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy" width="12" height="12">
            </td>
            <td><button class="btnsm" onclick="deletePassword(${index})">Delete</button></td>
          </tr>`;
        }
        tb.innerHTML += str;
      }

      // Clear input fields
      document.getElementById("website").value = "";
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    };

    console.log("Working");
    showPasswords();

    // Save password on button click
    document.querySelector(".btn").addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Clicked....");

      let website = document.getElementById("website").value;
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      let passwords = localStorage.getItem("passwords");

      if (passwords == null) {
        let json = [];
        json.push({ website, username, password });
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
      } else {
        let json = JSON.parse(passwords);
        json.push({ website, username, password });
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
      }
      showPasswords();
    });
  </script>

</body>
</html>
