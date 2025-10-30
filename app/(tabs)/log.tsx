import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const ACCENT = Colors.light.tint;

const LOG_TABS = [
  { key: 'all', label: 'All', count: 0, showCount: true },
  { key: 'excellent', label: 'Excellent' },
  { key: 'normal', label: 'Normal' },
  { key: 'advisory', label: 'Advisory' },
  { key: 'warning', label: 'Warning' },
];

export default function LogsScreen() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.brandRow}>
            <Ionicons name="car-sport" size={22} color={ACCENT} />
            <Text style={styles.brand}>AutoPulse</Text>
          </View>
        </View>

        <View style={styles.titleRow}>
          <Ionicons name="clipboard-outline" size={18} color={ACCENT} />
          <Text style={styles.title}>Logs</Text>
        </View>
        <Text style={styles.subtitle}>Vehicle Data Logs</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabRow}>
          {LOG_TABS.map(tab => (
            <Pressable
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                {tab.label}
                {tab.showCount ? (
                  <Text style={styles.tabCount}>{`(${tab.count})`}</Text>
                ) : null}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.card}>
          {/* Replace with log items mapped from data and filtered by activeTab */}
          <View style={styles.metricRow}>
            <Text style={{ color: '#637783', fontSize: 13 }}>No logs to show.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginBottom: 8,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    marginTop: 2,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#f3f6f9',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d2dae2',
  },
  tabActive: {
    backgroundColor: CARD,
    borderColor: ACCENT,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    color: '#607080',
    fontWeight: '700',
  },
  tabTextActive: {
    color: ACCENT,
  },
  tabCount: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
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
    alignItems: 'center',
  },
});
