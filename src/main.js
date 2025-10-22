const reminders = new Array();

const reminderNameInput = document.getElementById("reminderName");
const reminderIntervalInput = document.getElementById("reminderInterval");

const reminderList = document.getElementById("reminderList");

document.getElementById("addReminder").addEventListener("click", () => {
  Notification.requestPermission().then((result) => {
    const reminderName = reminderNameInput.value;
    const reminderInterval = parseFloat(reminderIntervalInput.value);

    if (
      result === "granted" &&
      reminderName.trim !== "" &&
      !isNaN(reminderInterval)
    ) {
      reminders.push(
        setInterval(() => {
          new Notification(`${reminderName}`);
        }, reminderInterval * 1000 * 60)
      );

      const div = document.createElement("div");
      div.className = "reminder";
      const reminderId = `${reminderName}${reminderInterval}${reminders.length}`;
      div.id = reminderId;

      const header = document.createElement("h3");
      header.textContent = `${reminderName}: ${reminderInterval} minutes`;

      const deleteButton = document.createElement("input");
      deleteButton.type = "button";
      deleteButton.textContent = "Remove";

      div.appendChild(header);
      div.appendChild(deleteButton);
      reminderList.appendChild(div);

      deleteButton.addEventListener("click", () => {
        const indexOfReminder = Array.prototype.indexOf.call(
          reminderList.children,
          document.getElementById(reminderId)
        );

        clearInterval(reminders.at(indexOfReminder));
        reminders.splice(indexOfReminder, 1);
        document.getElementById(reminderId).remove();

        console.log(
          `Removed reminder ${reminderName} with id: ${reminderId}\n${reminders}`
        );
      });

      reminderNameInput.value = "";
      reminderIntervalInput.value = "";

      console.log(
        `Added reminder ${reminderName} with id: ${reminderId}\n${reminders}`
      );
    }
  });
});
