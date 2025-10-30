import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const accent = Colors.light.tint;

  // ML data will come from Raspberry Pi - currently no data available
  const mlHealthScorePercent: number | null = null;
  const mlPrecisionLevel: 'normal' | 'medium' | 'low' | null = null;
  const systemStatus: 'normal' | 'medium' | 'at risk' | null = null;
  const troubleCodes: string[] | null = null;
  // ML model input features (from Raspberry Pi)
  const inputEngineRpm: number | null = null;
  const inputCoolantTempC: number | null = null;
  const inputEngineLoadPct: number | null = null;
  const inputThrottlePositionPct: number | null = null; // NEW: Throttle Position

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View style={styles.brandRow}>
          <Ionicons name="car-sport" size={22} color={accent} />
          <ThemedText style={styles.brand}>AutoPulse</ThemedText>
        </View>
        <Pressable accessibilityRole="button" onPress={() => router.push('/settings' as any)} hitSlop={8}>
          <Ionicons name="settings-outline" size={26} color="#2c3e50" />
        </Pressable>
      </View>

      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Dashboard</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Monitor your vehicle&apos;s performance</ThemedText>
      </View>

      <View style={styles.panelContainer}>
        <ThemedText type="subtitle" style={styles.panelTitle}>Random Forest ML Prediction</ThemedText>

        <View style={styles.panelCard}>
          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <IconSymbol name="speedometer" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>ML Health Score</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>
              {mlHealthScorePercent !== null ? `${mlHealthScorePercent}%` : 'N/A'}
            </ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <IconSymbol name="target" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>ML Precision</ThemedText>
            </View>
            {mlPrecisionLevel !== null ? (
              <View style={[styles.badge, getPrecisionBadgeStyle(mlPrecisionLevel)]}>
                <ThemedText style={[styles.badgeText, getBadgeTextStyle(mlPrecisionLevel)]}>
                  {capitalize(mlPrecisionLevel)}
                </ThemedText>
              </View>
            ) : (
              <ThemedText style={styles.pendingText}>N/A</ThemedText>
            )}
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <IconSymbol name="shield.checkerboard" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>System Status</ThemedText>
            </View>
            {systemStatus !== null ? (
              <View style={[styles.badge, getStatusBadgeStyle(systemStatus)]}>
                <ThemedText style={[styles.badgeText, getBadgeTextStyle(systemStatus)]}>
                  {systemStatus === 'at risk' ? 'At Risk' : capitalize(systemStatus)}
                </ThemedText>
              </View>
            ) : (
              <ThemedText style={styles.pendingText}>N/A</ThemedText>
            )}
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.troubleCodesSection}>
            <View style={styles.troubleCodesHeader}>
              <IconSymbol name="exclamationmark.triangle" size={22} color="#d35400" />
              <ThemedText style={styles.troubleCodesTitle}>Trouble Codes</ThemedText>
            </View>
            {troubleCodes === null ? (
              <ThemedText style={styles.troubleCodesEmpty}>Waiting for data from Raspberry Pi</ThemedText>
            ) : Array.isArray(troubleCodes) && troubleCodes.length === 0 ? (
              <ThemedText style={styles.troubleCodesEmpty}>No trouble codes detected</ThemedText>
            ) : (
              <View style={styles.troubleCodesList}>
                {(troubleCodes as string[]).map((code: string, idx: number) => (
                  <View key={idx} style={styles.troubleCodeBadge}>
                    <ThemedText style={styles.troubleCodeText}>{code}</ThemedText>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.panelContainer}>
        <ThemedText type="subtitle" style={styles.panelTitle}>ML Model Input Features</ThemedText>

        <View style={styles.panelCard}>
          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <IconSymbol name="gauge" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Engine RPM</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>
              {inputEngineRpm !== null ? `${inputEngineRpm} rpm` : 'N/A'}
            </ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <IconSymbol name="thermometer" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Coolant Temp</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>
              {inputCoolantTempC !== null ? `${inputCoolantTempC} °C` : 'N/A'}
            </ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <IconSymbol name="speedometer" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Engine Load</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>
              {inputEngineLoadPct !== null ? `${inputEngineLoadPct}%` : 'N/A'}
            </ThemedText>
          </View>

          <View style={styles.panelDivider} />
          
          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <IconSymbol name="stats-chart" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Throttle Position</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>
              {inputThrottlePositionPct !== null ? `${inputThrottlePositionPct}%` : 'N/A'}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.panelContainer}>
        <ThemedText type="subtitle" style={styles.panelTitle}>Calculated Performances Metrics</ThemedText>
        <View style={styles.panelCard}>
          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="swap-vertical" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Load/RPM Ratio</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="thermometer-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Temp Gradient</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="flash-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Throttle Response</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="alert-circle-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Engine Stress</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.panelContainer}>
        <ThemedText type="subtitle" style={styles.panelTitle}>Essential Sensor Readings</ThemedText>
        <View style={styles.panelCard}>
          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="speedometer-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Vehicle Speed</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="thermometer-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Intake Temp</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="trending-up-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Timing Advance</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="water-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>O2 Sensor</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="flame-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Catalyst Temp</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="cloud-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Baro Pressure</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.panelContainer}>
        <ThemedText type="subtitle" style={styles.panelTitle}>Fuel System</ThemedText>
        <View style={styles.panelCard}>
          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="water" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Fuel Pressure</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="speedometer-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Fuel Efficiency</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="trending-up-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Short Fuel Trim</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="trending-down-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Long Fuel Trim</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="alert-circle-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Fuel System Status</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.panelContainer}>
        <ThemedText type="subtitle" style={styles.panelTitle}>System Information</ThemedText>
        <View style={styles.panelCard}>
          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="battery-charging-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Control Module Voltage</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="time-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Engine Runtime</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="bug-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>EGR Error</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>

          <View style={styles.panelDivider} />

          <View style={styles.panelRow}>
            <View style={styles.panelRowLeft}>
              <Ionicons name="document-text-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.panelRowLabel}>Session ID</ThemedText>
            </View>
            <ThemedText style={styles.healthScore}>N/A</ThemedText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F1F6',
  },
  header: {
    padding: 20,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#E9F1F6',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: '#E9F1F6',
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    color: '#16445A',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7d86',
  },
  panelContainer: {
    padding: 20,
    backgroundColor: '#E9F1F6',
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
    color: '#123B4A',
  },
  panelCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E6E9ED',
  },
  panelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  panelRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  panelRowLabel: {
    fontSize: 16,
    color: '#123B4A',
    fontWeight: '600',
  },
  panelDivider: {
    height: 1,
    backgroundColor: '#E6E9ED',
    marginVertical: 8,
  },
  healthScore: {
    fontSize: 22,
    fontWeight: '800',
    color: '#123B4A',
  },
  pendingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7d86',
    fontStyle: 'italic',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  troubleCodesSection: {
    paddingTop: 4,
  },
  troubleCodesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  troubleCodesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#123B4A',
  },
  troubleCodesEmpty: {
    fontSize: 14,
    color: '#6b7d86',
  },
  troubleCodesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  troubleCodeBadge: {
    backgroundColor: '#F8F1E7',
    borderColor: '#F0D7B8',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  troubleCodeText: {
    color: '#8E5A22',
    fontWeight: '700',
  },
});

function capitalize<T extends string>(value: T): T {
  return (value.charAt(0).toUpperCase() + value.slice(1)) as T;
}

function getPrecisionBadgeStyle(level: 'normal' | 'medium' | 'low') {
  switch (level) {
    case 'normal':
      return { backgroundColor: '#E8F6F0', borderColor: '#BFE7D7' };
    case 'medium':
      return { backgroundColor: '#FFF6E6', borderColor: '#F9DFB7' };
    case 'low':
      return { backgroundColor: '#FDEDEC', borderColor: '#F5B7B1' };
  }
}

function getStatusBadgeStyle(level: 'normal' | 'medium' | 'at risk') {
  switch (level) {
    case 'normal':
      return { backgroundColor: '#E8F6F0', borderColor: '#BFE7D7' };
    case 'medium':
      return { backgroundColor: '#FFF6E6', borderColor: '#F9DFB7' };
    case 'at risk':
      return { backgroundColor: '#FDEDEC', borderColor: '#F5B7B1' };
  }
}

function getBadgeTextStyle(level: 'normal' | 'medium' | 'low' | 'at risk') {
  switch (level) {
    case 'normal':
      return { color: '#136A50' };
    case 'medium':
      return { color: '#8A6D3B' };
    case 'low':
    case 'at risk':
      return { color: '#8B2F2B' };
  }
}
