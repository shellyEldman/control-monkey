import accounts from "./mock/accounts.json";
import accountDetails101 from "./mock/accountDetails_101";
import accountDetails102 from "./mock/accountDetails_102";
import accountDetails103 from "./mock/accountDetails_103";
import accountDetails104 from "./mock/accountDetails_104";
import accountDetails105 from "./mock/accountDetails_105";

const accountDetailsMap = {
  101: accountDetails101,
  102: accountDetails102,
  103: accountDetails103,
  104: accountDetails104,
  105: accountDetails105,
};

// getAccounts endpoint mock async function
export const getAccounts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(accounts);
    }, 1000);
  });
};

// getAccountDetails endpoint mock async function, receives accountId as argument
export const getAccountDetail = async (accountId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(accountDetailsMap[accountId]);
    }, 1200);
  });
};
