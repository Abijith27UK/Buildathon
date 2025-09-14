const express = require("express");
const authRouter = express.Router();
const { createClient } = require("../controllers/createClient");
const { updateClient } = require("../controllers/updateClient");
const { deleteClient } = require("../controllers/deleteClient");
const { getClients } = require("../controllers/getClients");
const { getClient } = require("../controllers/getClient");
const { getClientDocuments } = require("../controllers/getClientDocuments");
const { createPolicy } = require("../controllers/createPolicy");
const { updatePolicy } = require("../controllers/updatePolicy");
const { deletePolicy } = require("../controllers/deletePolicy");
const { getPolicies } = require("../controllers/getPolicies");
const { getPolicy } = require("../controllers/getPolicy");
const { addDocument } = require("../controllers/addDocument");
const { deleteDocument } = require("../controllers/deleteDocument");
const { getDashboard } = require("../controllers/getDashboard");
const { purchasePolicy } = require("../controllers/purchasePolicy");
const { getClientPolicies } = require("../controllers/getClientPolicies");
const { verifyDocuments } = require("../controllers/verifyDocuments");
require('dotenv').config();

// Dashboard routes
authRouter.get("/dashboard", getDashboard);

// Client routes
authRouter.get("/clients", getClients);
authRouter.get("/clients/:id", getClient);
authRouter.post("/clients", createClient);
authRouter.put("/clients/:id", updateClient);
authRouter.delete("/clients/:id", deleteClient);

// Client document routes
authRouter.get("/clients/:id/documents", getClientDocuments);
authRouter.post("/clients/:clientId/documents", addDocument);
authRouter.delete("/clients/:clientId/documents/:docId", deleteDocument);

// Policy routes
authRouter.get("/policies", getPolicies);
authRouter.get("/policies/:id", getPolicy);
authRouter.post("/policies", createPolicy);
authRouter.put("/policies/:id", updatePolicy);
authRouter.delete("/policies/:id", deletePolicy);

// Client Policy routes
authRouter.get("/clients/:clientId/policies", getClientPolicies);
authRouter.post("/clients/:clientId/policies/:policyId/purchase", purchasePolicy);
authRouter.post("/client-policies/:clientPolicyId/verify-documents", verifyDocuments);

module.exports = authRouter;