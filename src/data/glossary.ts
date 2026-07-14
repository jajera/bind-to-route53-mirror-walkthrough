export const glossary: Record<string, string> = {
  // Accounts and VPCs
  'onprem-account':
    'Simulated on-premises AWS account (CLI profile `bind-demo-onprem`) with BIND and the VPN appliance.',
  'workload-account':
    'AWS workload account (CLI profile `bind-demo-workload`) with Lambda, Route 53 PHZ, VGW, and the dig test instance.',
  'onprem-vpc':
    'VPC simulating on-premises (`10.0.0.0/16`) — hosts BIND_EC2, optional OnPrem_Instance, and the VPN appliance.',
  'workload-vpc':
    'VPC simulating AWS application land (`10.1.0.0/16`) — hosts VGW, Sync_Lambda, Test_Instance, and the Route 53 PHZ association.',

  // Hybrid connectivity
  'site-to-site-vpn':
    'Lab connectivity only — how Sync_Lambda reaches BIND for AXFR in this demo. Not the product focus; real estates may use Direct Connect or other private paths.',
  vgw: 'Virtual Private Gateway on Workload_VPC — AWS side of the Site-to-Site VPN.',
  'virtual-private-gateway':
    'Virtual Private Gateway on Workload_VPC — AWS side of the Site-to-Site VPN.',
  'customer-gateway':
    'AWS Customer Gateway object representing the on-prem VPN endpoint; implemented by the VPN appliance EC2 in this demo.',
  cgw: 'Customer Gateway — on-prem side of Site-to-Site VPN; backed by the Libreswan VPN appliance in this demo.',
  'vpn-appliance':
    'Libreswan EC2 in OnPrem_VPC that terminates IPsec toward the VGW (customer gateway role).',
  'vpn-tunnel':
    'Encrypted IPsec path carrying traffic (including AXFR) between Workload_VPC and OnPrem_VPC. This demo expects at least one tunnel UP.',
  ipsec: 'IPsec — encrypted tunnel protocol used by AWS Site-to-Site VPN and the Libreswan appliance.',
  libreswan: 'Open-source IPsec VPN software running on the on-prem VPN appliance EC2.',
  'nat-gateway':
    'NAT gateway in Workload_VPC — Sync_Lambda reaches the Route 53 API over HTTPS via NAT (not over the VPN).',
  'vpc-peering':
    'L3 VPC-to-VPC peering. Explicitly out of scope for this demo — connectivity is Site-to-Site VPN only.',

  // DNS authority and zone
  bind: 'Authoritative DNS server for corp.internal in the simulated on-prem account.',
  'bind-ec2':
    'EC2 in OnPrem_VPC running BIND — hosts zone files, listens on TCP/UDP 53, and is the AXFR source for Sync_Lambda.',
  'bind-master':
    'Authoritative BIND named server for corp.internal; runs on BIND_EC2 in OnPrem_VPC.',
  'corp-internal':
    'Demo private zone name (`corp.internal`). BIND is authoritative; Route 53 holds a read-only mirror in the workload VPC.',
  'private-hosted-zone':
    'Route 53 private hosted zone for corp.internal associated with Workload_VPC only (not OnPrem_VPC).',
  phz: 'Private hosted zone — Route 53 PHZ for corp.internal associated with Workload_VPC.',
  'route53-zone':
    'Route 53 private hosted zone for corp.internal associated with Workload_VPC — the mirror target for Sync_Lambda.',
  'amazon-provided-dns':
    'VPC resolver at the base of the VPC CIDR + 2 (also reachable as 169.254.169.253) — Test_Instance queries this to hit the Route 53 mirror.',
  'allow-transfer':
    'BIND ACL that permits AXFR only from the Lambda subnet (`10.1.1.0/24`); other sources (e.g. Test_Instance) are refused.',
  axfr: 'Full DNS zone transfer over TCP/53 — Sync_Lambda pulls the entire zone from BIND across the VPN tunnel.',
  ixfr: 'Incremental zone transfer. Out of scope — this demo uses full AXFR only.',
  rndc: 'BIND remote name daemon control — `rndc reload` loads zone file changes; `rndc status` confirms the server is up.',
  soa: 'Start of Authority record. Operators bump the SOA serial after zone edits; Sync_Lambda excludes SOA from the Route 53 diff.',
  dig: 'DNS lookup utility used on BIND and Test_Instance to prove authority and mirrored resolution.',

  // Sync pipeline
  lambda:
    'Sync_Lambda in Workload_VPC — EventBridge-scheduled job that AXFRs BIND and diffs Route 53.',
  'sync-lambda':
    'Lambda in Workload_VPC that AXFRs from BIND_EC2, diffs against the Route 53 PHZ, and applies ChangeResourceRecordSets batches.',
  eventbridge:
    'Amazon EventBridge — schedules Sync_Lambda on a fixed interval (default every 15 minutes).',
  'eventbridge-schedule':
    'EventBridge rule that triggers Sync_Lambda on Sync_Interval (default every 15 minutes).',
  'sync-interval':
    'Time between Sync_Lambda invocations (default 15 minutes). Bounds expected propagation delay together with Lambda runtime.',
  'master-dns':
    'Lambda input: BIND private IP in OnPrem_VPC used as the AXFR target.',
  'ignore-ttl':
    'Lambda sync option that excludes TTL from the comparison key and forces consistent Route 53 TTLs when applying changes.',
  'record-set':
    'Normalized DNS record (name, type, TTL, resource data) used when comparing AXFR output to Route 53.',
  'change-batch':
    'Group of Route 53 ChangeResourceRecordSets operations submitted in one API call (≤1000 changes).',
  'propagation-delay':
    'Time from a BIND zone change until Test_Instance returns the updated answer — up to Sync_Interval plus sync execution time.',
  'stale-snapshot':
    'On sync failure, Route 53 keeps the last successfully mirrored records until the next successful run.',

  // Instances and access
  'test-instance':
    'EC2 in Workload_VPC used to validate resolution via AmazonProvidedDNS against the Route 53 mirror — never queries BIND directly.',
  'onprem-instance':
    'Optional EC2 in OnPrem_VPC that queries BIND_EC2 directly — proves authoritative DNS before mirroring.',
  'session-manager':
    'AWS Systems Manager Session Manager — interactive shell on private EC2 without SSH keys; all demo hosts use SSM.',
  ssm: 'Systems Manager Session Manager — interactive shell on private EC2 without SSH keys.',
  eni: 'Elastic Network Interface — virtual NIC; used on the VPN appliance and for routing between tunnels and subnets.',
  cidr: 'Classless Inter-Domain Routing — IP range such as `10.0.0.0/16` (on-prem) and `10.1.0.0/16` (workload); CIDRs must not overlap for VPN routing.',

  // Ops / docs
  cloudwatch:
    'Amazon CloudWatch Logs — Sync_Lambda emits structured JSON events (`sync_start`, `axfr_complete`, `diff_summary`, `sync_success`, `sync_error`).',
  'placeholder-id':
    'Synthetic AWS identifier used in docs (e.g. ACCOUNT_ID, 123456789012) instead of real account IDs or secrets.',
  'upstream-demo-repo':
    'jajera/bind-to-route53-mirror-demo — Terraform, Lambda sync code, and operator docs; this site is the companion walkthrough only.',
  'primary-region':
    '`ap-southeast-2` (Sydney) — default region for both demo accounts and stacks.',
};
