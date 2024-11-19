import cron from "node-cron";
import { workflowModel } from "../../models/workflow.model";

export const startCronJobs = () => {
  cron.schedule("0 18 * * *", async () => {
    try {
      await workflowModel.updateMany({ isActive: true }, { isActive: false });

      const latestWorkflow = await workflowModel
        .findOne()
        .sort({ version: -1 });

      if (latestWorkflow) {
        latestWorkflow.isActive = true;
        await latestWorkflow.save();
        console.log("Activated the latest workflow:", latestWorkflow.name);
      }
    } catch (error) {
      console.error("Error activating workflow:", error);
    }
  });
  console.log("Cron jobs initialized.");
};
