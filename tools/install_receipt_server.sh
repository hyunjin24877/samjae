#!/bin/sh
set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
service_dir="$HOME/Library/Application Support/SamjaeReceipt"
agent_dir="$HOME/Library/LaunchAgents"
agent_name=com.samjae.receipt-server
agent_file="$agent_dir/$agent_name.plist"
agent_target="gui/$(id -u)/$agent_name"

mkdir -p "$service_dir" "$agent_dir" "$HOME/Library/Logs/SamjaeReceipt"
install -m 644 "$project_dir/tools/receipt_server.py" "$service_dir/receipt_server.py"
plutil -lint "$project_dir/tools/$agent_name.plist"

launchctl bootout "$agent_target" 2>/dev/null || true
install -m 644 "$project_dir/tools/$agent_name.plist" "$agent_file"
launchctl bootstrap "gui/$(id -u)" "$agent_file"
launchctl kickstart -k "$agent_target"
