import alert from "./alert.json";
import auditlog from "./auditLog.json";
import backup from "./backup.json";
import backupplan from "./backupPlan.json";
import backuprestorepoint from "./backupRestorePoint.json";
import backupstorerepository from "./backupStoreRepository.json";
import basic from "./basic.json";
import cloudtowerapplicationpackage from "./cloudTowerApplicationPackage.json";
import cluster from "./cluster.json";
import clusterupgrade from "./clusterUpgrade.json";
import common from "./common.json";
import components from "./components.json";
import connection from "./connection.json";
import consistencygroup from "./consistencyGroup.json";
import consistencygroupsnapshot from "./consistencyGroupSnapshot.json";
import contentlibraryimage from "./contentLibraryImage.json";
import contentlibraryvmtemplate from "./contentLibraryVmTemplate.json";
import datacenter from "./datacenter.json";
import disk from "./disk.json";
import elfdatastore from "./elfDataStore.json";
import elfimage from "./elfImage.json";
import entityfilter from "./entityFilter.json";
import enumObj from "./enum.json";
import error from "./error.json";
import eventaudit from "./eventAudit.json";
import everoute from "./everoute.json";
import everoutecluster from "./everouteCluster.json";
import everoutepackage from "./everoutePackage.json";
import executePlan from "./execute_plan.json";
import globalalertrule from "./globalAlertRule.json";
import gpudevice from "./gpuDevice.json";
import graph from "./graph.json";
import hardwareTopo from "./hardware-topo.json";
import host from "./host.json";
import httpcode from "./httpCode.json";
import installer from "./installer.json";
import iscsiconnection from "./iscsiConnection.json";
import iscsilun from "./iscsiLun.json";
import iscsilunsnapshot from "./iscsiLunSnapshot.json";
import iscsitarget from "./iscsiTarget.json";
import isolationpolicy from "./isolationPolicy.json";
import label from "./label.json";
import logcollection from "./logCollection.json";
import login from "./login.json";
import maintenanceMode from "./maintenance-mode.json";
import metric from "./metric.json";
import migratetransmitter from "./migrateTransmitter.json";
import monitor from "./monitor.json";
import namespacegroup from "./namespaceGroup.json";
import nfsexport from "./nfsExport.json";
import nfsinode from "./nfsInode.json";
import nic from "./nic.json";
import nvmfconnection from "./nvmfConnection.json";
import nvmfnamespace from "./nvmfNamespace.json";
import nvmfnamespacesnapshot from "./nvmfNamespaceSnapshot.json";
import nvmfsubsystem from "./nvmfSubsystem.json";
import nvmfsubsystemsnapshot from "./nvmfSubsystemSnapshot.json";
import overview from "./overview.json";
import plugins from "./plugins.json";
import pmemdimm from "./pmemDimm.json";
import portal from "./portal.json";
import recyclebin from "./recycleBin.json";
import recyclevm from "./recycleVm.json";
import reportTask from "./report-task.json";
import reportTemplate from "./report-template.json";
import reporttask from "./reportTask.json";
import reporttemplate from "./reportTemplate.json";
import requestcode from "./requestCode.json";
import role from "./role.json";
import securitygroup from "./securityGroup.json";
import securitypolicy from "./securityPolicy.json";
import setting from "./setting.json";
import setup from "./setup.json";
import snapshot from "./snapshot.json";
import snapshotgroup from "./snapshotGroup.json";
import snapshotplan from "./snapshotPlan.json";
import snapshotplantask from "./snapshotPlanTask.json";
import snmpTransport from "./snmp-transport.json";
import snmpTrapReceiver from "./snmp-trap-receiver.json";
import snmptransport from "./snmpTransport.json";
import snmptrapreceiver from "./snmpTrapReceiver.json";
import storage from "./storage.json";
import svtimage from "./svtImage.json";
import systemauditlog from "./systemAuditLog.json";
import task from "./task.json";
import title from "./title.json";
import ui from "./ui.json";
import usbdevice from "./usbDevice.json";
import user from "./user.json";
import userauditlog from "./userAuditLog.json";
import userrolenext from "./userRoleNext.json";
import validation from "./validation.json";
import vds from "./vds.json";
import view from "./view.json";
import vlan from "./vlan.json";
import vm from "./vm.json";
import vmdisk from "./vmDisk.json";
import vmentityfilterresult from "./vmEntityFilterResult.json";
import vmfolder from "./vmFolder.json";
import vmplacementgroup from "./vmPlacementGroup.json";
import vmsnapshot from "./vmSnapshot.json";
import vmtemplate from "./vmTemplate.json";
import vmvolume from "./vmVolume.json";
import vsphereesxiaccount from "./vsphereEsxiAccount.json";
import witness from "./witness.json";
import zone from "./zone.json";

const locale = {
  alert: alert,
  auditLog: auditlog,
  backup: backup,
  backupPlan: backupplan,
  backupRestorePoint: backuprestorepoint,
  backupStoreRepository: backupstorerepository,
  basic: basic,
  cloudTowerApplicationPackage: cloudtowerapplicationpackage,
  cluster: cluster,
  clusterUpgrade: clusterupgrade,
  common: common,
  components: components,
  connection: connection,
  consistencyGroup: consistencygroup,
  consistencyGroupSnapshot: consistencygroupsnapshot,
  contentLibraryImage: contentlibraryimage,
  contentLibraryVmTemplate: contentlibraryvmtemplate,
  datacenter: datacenter,
  disk: disk,
  elfDataStore: elfdatastore,
  elfImage: elfimage,
  entityFilter: entityfilter,
  enum: enumObj,
  error: error,
  eventAudit: eventaudit,
  everoute: everoute,
  everouteCluster: everoutecluster,
  everoutePackage: everoutepackage,
  execute_plan: executePlan,
  globalAlertRule: globalalertrule,
  gpuDevice: gpudevice,
  graph: graph,
  "hardware-topo": hardwareTopo,
  host: host,
  httpCode: httpcode,
  installer: installer,
  iscsiConnection: iscsiconnection,
  iscsiLun: iscsilun,
  iscsiLunSnapshot: iscsilunsnapshot,
  iscsiTarget: iscsitarget,
  isolationPolicy: isolationpolicy,
  label: label,
  logCollection: logcollection,
  login: login,
  "maintenance-mode": maintenanceMode,
  metric: metric,
  migrateTransmitter: migratetransmitter,
  monitor: monitor,
  namespaceGroup: namespacegroup,
  nfsExport: nfsexport,
  nfsInode: nfsinode,
  nic: nic,
  nvmfConnection: nvmfconnection,
  nvmfNamespace: nvmfnamespace,
  nvmfNamespaceSnapshot: nvmfnamespacesnapshot,
  nvmfSubsystem: nvmfsubsystem,
  nvmfSubsystemSnapshot: nvmfsubsystemsnapshot,
  overview: overview,
  plugins: plugins,
  pmemDimm: pmemdimm,
  portal: portal,
  recycleBin: recyclebin,
  recycleVm: recyclevm,
  "report-task": reportTask,
  "report-template": reportTemplate,
  reportTask: reporttask,
  reportTemplate: reporttemplate,
  requestCode: requestcode,
  role: role,
  securityGroup: securitygroup,
  securityPolicy: securitypolicy,
  setting: setting,
  setup: setup,
  snapshot: snapshot,
  snapshotGroup: snapshotgroup,
  snapshotPlan: snapshotplan,
  snapshotPlanTask: snapshotplantask,
  "snmp-transport": snmpTransport,
  "snmp-trap-receiver": snmpTrapReceiver,
  snmpTransport: snmptransport,
  snmpTrapReceiver: snmptrapreceiver,
  storage: storage,
  svtImage: svtimage,
  systemAuditLog: systemauditlog,
  task: task,
  title: title,
  ui: ui,
  usbDevice: usbdevice,
  user: user,
  userAuditLog: userauditlog,
  userRoleNext: userrolenext,
  validation: validation,
  vds: vds,
  view: view,
  vlan: vlan,
  vm: vm,
  vmDisk: vmdisk,
  vmEntityFilterResult: vmentityfilterresult,
  vmFolder: vmfolder,
  vmPlacementGroup: vmplacementgroup,
  vmSnapshot: vmsnapshot,
  vmTemplate: vmtemplate,
  vmVolume: vmvolume,
  vsphereEsxiAccount: vsphereesxiaccount,
  witness: witness,
  zone: zone,
};

export default locale;
