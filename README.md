# expense-tracker
Angular application with aspnet core web api and MySql as a backend database to track expenses.

I've tried to make the process of adding a new expense less than 5s.

Expenses are groupped by category, so adding a new *gas* bill should take around 4 clicks, and angular interface makes it very smooth to operate in mobile devices.

Other features include Filtering expenses by category and date, option to check an expension location in maps etc.

Statistics page offers chart and text data for expense groups (*here is a chance you will find out your car is not as economical as you thought it is*), total of expenses for the selected dates, and distribution by category in last 12 months with a bar chart.

Another feature I've added lately includes the ability to add expenses when there's no network connection, thanks to PWA, you can browse and add different bills, they will be syncronized autoamtically when conectivity is available.


## Ussage

- Create a mysql database, and update the connection string.
- Create your own Categories and Groups

then it should be ready to use.

[https://ermir.net](https://ermir.net)
