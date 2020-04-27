import globalStoreCreator from "./globalStore";

const init = async function () {
  const store = await globalStoreCreator();
};

init();
