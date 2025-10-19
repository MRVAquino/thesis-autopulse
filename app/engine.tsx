import { Colors } from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

function useEngineTelemetry() {
    const defaults = {
        rpm: 'N/A',
        intakeAirTemp: 'N/A',
        coolantTemp: 'N/A',
        map: 'N/A',
        engineLoad: 'N/A',
        throttlePosition: 'N/A',
        ignitionAdvance: 'N/A',
    };
    const [data, setData] = useState(defaults);
    const [loading, setLoading] = useState(false);

    const fetchLatest = async () => {
        try {
            setLoading(true);
            const { data: rows } = await supabase
                .from('telemetry_data')
                .select('*')
                .order('timestamp', { ascending: false })
                .limit(1);
            const row = rows && rows[0];
            setData({
                rpm: row?.rpm != null ? String(row.rpm) : 'N/A',
                intakeAirTemp: row?.intake_air_temp != null ? String(row.intake_air_temp) : 'N/A',
                coolantTemp: row?.coolant_temp != null ? String(row.coolant_temp) : 'N/A',
                map: row?.map_kpa != null ? String(row.map_kpa) : 'N/A',
                engineLoad: row?.engine_load_pct != null ? String(row.engine_load_pct) : 'N/A',
                throttlePosition: row?.throttle_position != null ? String(row.throttle_position) : 'N/A',
                ignitionAdvance: row?.ignition_advance != null ? String(row.ignition_advance) : 'N/A',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLatest();
    }, []);

    const refresh = () => fetchLatest();
    return { data, refresh, loading };
}

export default function EngineScreen() {
    const { data, refresh, loading } = useEngineTelemetry();
	const accent = Colors.light.tint;
	const [refreshing, setRefreshing] = useState(false);

	const badges = useMemo(() => (
		[
			{ label: 'No Data', color: '#95a5a6' },
			{ label: 'OBD Scanner Required', color: '#3498db' },
		]
	), []);

	async function onRefresh() {
		setRefreshing(true);
		await new Promise(resolve => setTimeout(resolve, 800));
		refresh();
		setRefreshing(false);
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView 
				contentContainerStyle={styles.content} 
				showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing || loading} onRefresh={onRefresh} tintColor={accent} colors={[accent]} />}
			>
				
				<View style={styles.headerRow}>
					<View style={styles.brandRow}>
						<Ionicons name="car-sport" size={22} color={accent} />
						<Text style={styles.brand}>AutoPulse</Text>
					</View>
				</View>

				
				<View style={styles.titleRow}>
					<Ionicons name="settings-outline" size={18} color={accent} />
					<Text style={styles.title}>Engine Monitoring</Text>
				</View>
				<Text style={styles.subtitle}>Monitor your vehicle&apos;s engine metrics in real-time</Text>

				
				<View style={styles.badgeRow}>
					{badges.map(b => (
						<View key={b.label} style={[styles.badge, { backgroundColor: `${b.color}22`, borderColor: b.color }]}> 
							<Ionicons name="ellipse" size={8} color={b.color} />
							<Text style={[styles.badgeText, { color: b.color }]}>{b.label}</Text>
						</View>
					))}
				</View>

				
				<View style={styles.card}>
					<View style={styles.metricRow}>
						<MetricTile iconName="speedometer" iconBg="#E8F1F7" iconColor={accent} label="Engine RPM" value={`${data.rpm} rpm`} />
						<MetricTile iconName="thermometer" iconBg="#EAF6EC" iconColor="#2ecc71" label="Coolant Temp" value={`${data.coolantTemp}°C`} />
					</View>
					<View style={styles.metricRow}>
						<MetricTile iconName="thermometer-outline" iconBg="#FFF4DD" iconColor="#f1c40f" label="Intake Air Temp" value={`${data.intakeAirTemp}°C`} />
						<MetricTile iconName="stats-chart" iconBg="#E9F5FF" iconColor={accent} label="MAP" value={`${data.map} kPa`} />
					</View>
					<View style={styles.metricRow}>
						<MetricTile iconName="gauge" iconBg="#FFEFF2" iconColor="#e74c3c" label="Engine Load" value={`${data.engineLoad}%`} />
						<MetricTile iconName="speedometer-outline" iconBg="#E8F1F7" iconColor={accent} label="Throttle Position" value={`${data.throttlePosition}%`} />
					</View>
					<View style={styles.metricRow}>
						<MetricTile iconName="flash" iconBg="#FFF4DD" iconColor="#f1c40f" label="Ignition Advance" value={`${data.ignitionAdvance}°`} />
					</View>
				</View>

				
				<Pressable style={({ pressed }) => [styles.secondaryButton, pressed && { opacity: 0.9 }]} onPress={() => router.replace('/(tabs)')}>
					<Ionicons name="arrow-back" size={18} color={accent} />
					<Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
				</Pressable>

				<Text style={styles.footer}>AutoPulse: Vehicle Diagnostic System</Text>
			</ScrollView>
		</SafeAreaView>
	);
}

function MetricTile({ iconName, iconBg, iconColor, label, value }: { iconName: any; iconBg: string; iconColor: string; label: string; value: string }) {
	return (
		<View style={styles.tile}>
			<View style={[styles.tileIcon, { backgroundColor: iconBg }]}>
				<Ionicons name={iconName} size={16} color={iconColor} />
			</View>
			<View style={styles.tileText}>
				<Text style={styles.tileLabel}>{label}</Text>
				<Text style={styles.tileValue}>{value}</Text>
			</View>
		</View>
	);
}

const BG = '#E9F1F6';
const CARD = '#ffffff';

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: BG,
	},
	content: {
		padding: 16,
		gap: 12,
	},
	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	brandRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	brand: {
		fontSize: 20,
		fontWeight: '800',
		color: '#16445A',
	},
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginTop: 6,
	},
	title: {
		fontSize: 18,
		fontWeight: '800',
		color: '#123B4A',
	},
	subtitle: {
		color: '#6b7d86',
	},
	badgeRow: {
		flexDirection: 'row',
		gap: 8,
		flexWrap: 'wrap',
		marginTop: 6,
	},
	badge: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 999,
		borderWidth: 1,
	},
	badgeText: {
		fontWeight: '700',
	},
	card: {
		backgroundColor: CARD,
		borderRadius: 14,
		padding: 12,
		shadowColor: '#000',
		shadowOpacity: 0.08,
		shadowRadius: 10,
		elevation: 3,
		gap: 12,
	},
	metricRow: {
		flexDirection: 'row',
		gap: 10,
	},
	tile: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
		backgroundColor: '#ffffff',
		borderRadius: 12,
		padding: 10,
		borderWidth: 1,
		borderColor: '#E6E9ED',
	},
	tileIcon: {
		width: 32,
		height: 32,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tileText: {
		gap: 2,
		flex: 1,
		minWidth: 0,
	},
	tileLabel: {
		color: '#637783',
		fontSize: 12,
		fontWeight: '600',
		flexWrap: 'wrap',
	},
	tileValue: {
		color: '#123B4A',
		fontSize: 14,
		fontWeight: '800',
		flexWrap: 'wrap',
	},
	secondaryButton: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		backgroundColor: 'transparent',
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderRadius: 10,
		alignSelf: 'stretch',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#C9D3DA',
	},
	secondaryButtonText: {
		color: '#123B4A',
		fontWeight: '800',
	},
	footer: {
		textAlign: 'center',
		color: '#6b7d86',
		marginTop: 16,
	},
});
