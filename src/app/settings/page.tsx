'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import {
  User,
  CreditCard,
  Shield,
  Loader2,
  Save,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Mail,
  Trash2,
  Download,
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-cyan-500 animate-spin" />
        </div>
      }
    >
      <Settings />
    </Suspense>
  );
}

function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  // Profile form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Danger zone
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
          setEmail(data.email || '');
        }
      } catch (err) {
        console.error('Failed to load user:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch('/api/auth/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName }),
      });
      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        setSaveMessage({ type: 'success', text: 'Profile updated successfully.' });
      } else {
        const err = await res.json();
        setSaveMessage({ type: 'error', text: err.error || 'Failed to update profile.' });
      }
    } catch {
      setSaveMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="h-3.5 w-3.5" /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard className="h-3.5 w-3.5" /> },
    { id: 'danger', label: 'Danger Zone', icon: <Shield className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="border-b border-slate-900 pb-6 mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Settings</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your account, profile, and subscription preferences.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 text-cyan-500 animate-spin" />
            <p className="text-sm text-slate-400">Loading settings...</p>
          </div>
        ) : (
          <>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-8" />

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {saveMessage && (
                  <Alert variant={saveMessage.type === 'success' ? 'success' : 'error'}>
                    {saveMessage.text}
                  </Alert>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your name and profile details.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                      />
                      <Input
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                      />
                    </div>

                    <div className="mt-5">
                      <Input
                        label="Email Address"
                        value={email}
                        disabled
                        helperText="Email cannot be changed from settings."
                      />
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <Button onClick={handleSaveProfile} loading={saving} size="sm">
                        <Save className="h-4 w-4 mr-1.5" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                    <CardDescription>Read-only account information.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-slate-800/50">
                        <div className="flex items-center gap-2.5">
                          <Mail className="h-4 w-4 text-slate-500" />
                          <span className="text-sm text-slate-400">Email</span>
                        </div>
                        <span className="text-sm text-white font-medium">{user?.email}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-slate-800/50">
                        <div className="flex items-center gap-2.5">
                          <Calendar className="h-4 w-4 text-slate-500" />
                          <span className="text-sm text-slate-400">Member Since</span>
                        </div>
                        <span className="text-sm text-white font-medium">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-slate-800/50">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle className="h-4 w-4 text-slate-500" />
                          <span className="text-sm text-slate-400">Last Login</span>
                        </div>
                        <span className="text-sm text-white font-medium">
                          {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-2.5">
                          <User className="h-4 w-4 text-slate-500" />
                          <span className="text-sm text-slate-400">User ID</span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono bg-slate-900 px-2 py-1 rounded">
                          {user?.id?.slice(0, 12)}...
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      Your subscription tier and monthly blueprint usage.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-extrabold text-white capitalize">
                              {user?.tier || 'free'}
                            </span>
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                              user?.tier === 'pro'
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                : user?.tier === 'starter'
                                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            }`}>
                              Active
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mt-1">
                            {user?.tier === 'free'
                              ? 'Basic access with limited blueprint generations.'
                              : user?.tier === 'starter'
                              ? '5 blueprints per month with priority generation.'
                              : 'Unlimited blueprints with all premium features.'}
                          </p>
                        </div>
                        {user?.tier !== 'pro' && (
                          <Button onClick={() => router.push('/pricing')} size="sm">
                            <CreditCard className="h-4 w-4 mr-1.5" />
                            Upgrade Plan
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Usage */}
                    <div className="mt-6 space-y-4">
                      <h4 className="text-sm font-bold text-white">Monthly Usage</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                            Blueprints Used
                          </span>
                          <div className="flex items-baseline gap-1.5 mt-2">
                            <span className="text-3xl font-extrabold text-white">
                              {user?.blueprintsUsedThisMonth || 0}
                            </span>
                            <span className="text-sm text-slate-500">
                              / {user?.blueprintLimit === 99999 ? 'Unlimited' : user?.blueprintLimit}
                            </span>
                          </div>
                          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="gradient-bg h-1.5 rounded-full transition-all duration-500"
                              style={{
                                width: `${
                                  user?.blueprintLimit === 99999
                                    ? 10
                                    : Math.min(
                                        ((user?.blueprintsUsedThisMonth || 0) /
                                          (user?.blueprintLimit || 1)) *
                                          100,
                                        100
                                      )
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                            Usage Reset Date
                          </span>
                          <div className="mt-2 text-lg font-bold text-white">
                            {user?.monthlyResetDate
                              ? new Date(user.monthlyResetDate).toLocaleDateString()
                              : 'N/A'}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Your monthly quota resets on this date.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 pt-5 border-t border-slate-800/50 flex flex-wrap gap-3">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          const el = document.createElement('a');
                          el.href = '/api/blueprints';
                          el.download = 'blueprints.json';
                          el.click();
                        }}
                      >
                        <Download className="h-4 w-4 mr-1.5" />
                        Export Blueprints
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === 'danger' && (
              <div className="space-y-6">
                <Card className="border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-400">Danger Zone</CardTitle>
                    <CardDescription>
                      Irreversible actions that affect your account and data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                            Delete Account
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 max-w-md">
                            Permanently delete your account and all associated data including
                            blueprints, subscription, and usage history. This action cannot be undone.
                          </p>
                        </div>
                        <div>
                          {!confirmDelete ? (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => setConfirmDelete(true)}
                            >
                              <Trash2 className="h-4 w-4 mr-1.5" />
                              Delete Account
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  setConfirmDelete(false);
                                  alert(
                                    'Account deletion is not available in this version. Please contact support.'
                                  );
                                }}
                              >
                                Confirm Delete
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setConfirmDelete(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/30 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-bold text-white">Sign Out</h4>
                          <p className="text-xs text-slate-400 mt-1 max-w-md">
                            Sign out of your account on this device.
                          </p>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => router.push('/')}
                        >
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
