import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Camera,
  ArrowLeft,
  Upload,
  Image,
  Send,
  CheckCircle,
  Eye,
} from "lucide-react";

export default function UploadItem() {
  const { requestId } = useParams<{ requestId: string }>();
  const [, setLocationPath] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [contactReveal, setContactReveal] = useState(false);

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!requestId || !user) throw new Error("Missing data");
      
      const data = {
        requestId,
        driverId: user.id,
        description,
        photoUrl: photoUrl || null,
        contactReveal,
      };

      const response = await apiRequest("POST", "/api/found-items", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/found-items/driver"] });
      toast({
        title: "Item Uploaded!",
        description: "The passenger has been notified about their found item.",
      });
      setLocationPath("/driver/found-items");
    },
    onError: (error: Error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload found item details.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) {
      toast({
        title: "Description Required",
        description: "Please provide a description of the found item.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate();
  };

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900">
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/driver-dashboard">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 -ml-2 mb-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Upload Found Item
          </h1>
          <p className="text-green-100">Provide details about the item you found</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-green-500" />
              Found Item Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label>Photo of Found Item (Optional)</Label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center">
                  {photoUrl ? (
                    <div className="space-y-4">
                      <div className="w-48 h-48 mx-auto rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setPhotoUrl("")}
                      >
                        Remove Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Image className="w-8 h-8 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                          Drag and drop or click to upload
                        </p>
                        <Button type="button" variant="outline" data-testid="button-upload-photo">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Photo
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Or enter a URL:
                      </p>
                      <input
                        type="url"
                        placeholder="https://example.com/photo.jpg"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        data-testid="input-photo-url"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the found item - its condition, where you found it, any identifying features..."
                  className="min-h-[120px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  data-testid="input-description"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Reveal Contact Details</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Allow the passenger to see your phone number
                    </p>
                  </div>
                </div>
                <Switch
                  checked={contactReveal}
                  onCheckedChange={setContactReveal}
                  data-testid="switch-contact-reveal"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
                disabled={submitMutation.isPending || !description}
                data-testid="button-submit"
              >
                {submitMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Found Item
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
