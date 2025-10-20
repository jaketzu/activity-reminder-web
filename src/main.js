const notifications = new Map();

const reminderNameInput = document.getElementById("reminderName");
const reminderIntervalInput = document.getElementById("reminderInterval");

const reminderList = document.getElementById("reminderList");

document.getElementById("addReminder").addEventListener("click", () => {
  Notification.requestPermission().then((result) => {
    const reminderName = reminderNameInput.value;
    const reminderInterval = parseFloat(reminderIntervalInput.value);

    if (result === "granted" && !isNaN(reminderInterval)) {
      notifications.push(
        new Notification(`${reminderName}`),
        setInterval(() => {}, reminderInterval * 1000 * 60)
      );

      const li = document.createElement("li");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "🗑️";

      li.appendChild(deleteButton);
      li.textContent = `${reminderName}: ${reminderInterval} minutes`;

      reminderList.appendChild(li);

      reminderNameInput.value = "";
      reminderIntervalInput.value = "";
    }
  });
});
