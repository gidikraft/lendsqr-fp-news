import perf from '@react-native-firebase/perf';

export const screenTrace = async (screenName: string) => {
  try {
    const trace = await perf().startScreenTrace(screenName);
    // Stop the trace
    await trace.stop();
  } catch (e) {
    console.log(e, 'screen trace error');
    // rejects if iOS or (Android == 8 || Android == 8.1)
    // or if hardware acceleration is off
  }
};
